import { BadRequestException, Inject, Injectable, CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/users.schema';
import { UserRole } from 'src/shares/enums/user.enum';
import { GetUsersDto } from './dto/get-users.dto';
import { GetUserDto } from './dto/get-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { httpErrors } from 'src/shares/exceptions';
import { UserFacebookInfoDto } from '../auth/dto/user-facebook-info.dto';
import { UserGoogleInfoDto } from '../auth/dto/user-google-info.dto';
import ChangePasswordDto from './dto/change-password.dto';
import { generateHash, validateHash } from 'src/shares/helpers/bcrypt';
import { randomCodeNumber } from 'src/shares/helpers/utils';
import { CreateUserDto } from './dto/create-user.dto';
import { FORGOT_PASSWORD_CACHE, FORGOT_PASSWORD_EXPIRY, SIGN_UP_CACHE, SIGN_UP_EXPIRY } from '../auth/auth.constants';
import ChangePasswordByCodeDto from './dto/change-password-by-code.dto';
import { CacheForgotPassword, ForgotPasswordDto } from './dto/forgot-password.dto';
import { SignUpByCodeDto } from './dto/sign-up-by-code.dto';
import { SignUpCacheInterface, SignUpDto } from './dto/sign-up.dto';
import { MailService } from '../mail/mail.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private mailService: MailService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async signUpByCode(signUpByCodeDto: SignUpByCodeDto): Promise<void> {
    const { code, email } = signUpByCodeDto;
    const verifyUserCache = await this.cacheManager.get<string>(`${SIGN_UP_CACHE}${email}`);
    if (!verifyUserCache) {
      throw new BadRequestException(httpErrors.USER_EMAIL_VERIFY_FAIL);
    }
    const signUpInfo: SignUpCacheInterface = JSON.parse(verifyUserCache);

    if (signUpInfo.attempt > 4) {
      throw new BadRequestException(httpErrors.USER_CODE_INVALID);
    }

    if (code != signUpInfo.code) {
      await this.cacheManager.set<string>(
        `${SIGN_UP_CACHE}${email}`,
        JSON.stringify({ ...signUpInfo, attempt: signUpInfo.attempt + 1 }),
        {
          ttl: SIGN_UP_EXPIRY,
        },
      );
      throw new BadRequestException(httpErrors.USER_EXPIRED_CODE);
    }

    if (signUpInfo.code !== code) {
      throw new BadRequestException(httpErrors.USER_EMAIL_VERIFY_FAIL);
    }

    const { name, display_name, password } = signUpInfo;
    await this.createUser({ email, name, display_name, password });
  }

  async signUp(signUpDto: SignUpDto): Promise<void> {
    const { email, password, name, display_name } = signUpDto;
    const user = await this.findOne({ email: email });
    if (user) {
      throw new BadRequestException('The email already exist!');
    }
    const code = randomCodeNumber(6);
    const { hashPassword } = await generateHash(password);
    await this.mailService.sendSignUpEmailJob({ email, code, name, display_name, password: hashPassword });
  }

  async changePasswordByCode(changePasswordByCode: ChangePasswordByCodeDto): Promise<void> {
    const { verifyCode, password, email } = changePasswordByCode;
    const user = await this.checkVerificationCode(verifyCode, email);
    const { hashPassword } = await generateHash(password);
    await this.userModel.updateOne({ _id: user._id }, { password: hashPassword });
  }

  async checkVerificationCode(verifyCode: string, email: string): Promise<User> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new BadRequestException(httpErrors.EMAIL_CONFIRM_NOT_FOUND);
    }
    const verifyUserCache = await this.cacheManager.get<string>(`${FORGOT_PASSWORD_CACHE}${email}`);
    if (!verifyUserCache) {
      throw new BadRequestException();
    }
    const forgotPasswordInfo: CacheForgotPassword = JSON.parse(verifyUserCache);

    if (forgotPasswordInfo.attempt > 4) {
      throw new BadRequestException(httpErrors.USER_CODE_INVALID);
    }

    if (verifyCode != forgotPasswordInfo.code) {
      await this.cacheManager.set<string>(
        `${FORGOT_PASSWORD_CACHE}${email}`,
        JSON.stringify({ ...forgotPasswordInfo, attempt: forgotPasswordInfo.attempt + 1 }),
        {
          ttl: FORGOT_PASSWORD_EXPIRY,
        },
      );
      throw new BadRequestException(httpErrors.USER_EXPIRED_CODE);
    }

    return user;
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<void> {
    const { email } = forgotPasswordDto;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new BadRequestException(httpErrors.EMAIL_CONFIRM_NOT_FOUND);
    }

    await this.mailService.sendForgotPasswordEmailJob(email);
  }

  async changePassword(changePasswordDto: ChangePasswordDto): Promise<void> {
    const { email, password, newPassword } = changePasswordDto;
    const user = await this.userModel.findOne({ email });
    const validatePassword = await validateHash(password, user?.password || '');
    if (!user || !validatePassword) {
      throw new BadRequestException(httpErrors.USER_WRONG_PASSWORD);
    }
    const { hashPassword } = await generateHash(newPassword);
    await this.userModel.updateOne({ _id: user.id }, { password: hashPassword });
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { email } = createUserDto;
    const user = await this.userModel.findOne({ email });
    if (user) {
      throw new BadRequestException(httpErrors.ACCOUNT_EXISTED);
    }

    return this.userModel.create(createUserDto);
  }

  async findAll(query: GetUsersDto): Promise<User[]> {
    const { sort, page, limit } = query;
    return this.userModel
      .find()
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: sort })
      .lean();
  }

  async findByIdAndUpdate(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
  }

  async findOne(condition: GetUserDto, selectPassword = false): Promise<User> {
    if (selectPassword) {
      return this.userModel.findOne(condition).select('+password').lean().exec();
    }
    return this.userModel.findOne(condition).lean().exec();
  }

  async findById(_id: string): Promise<User> {
    return this.userModel.findById({ _id }).select('-password').lean();
  }

  async findOrCreateFacebookUser(profile: UserFacebookInfoDto): Promise<UserDocument> {
    let user = await this.userModel.findOne({ facebookId: profile.id }).exec();

    if (user) {
      return this.userModel.findByIdAndUpdate(
        user._id,
        {
          image_url: profile.picture.data.url,
          lastLoginAt: new Date(),
        },
        { new: true },
      );
    }

    user = await this.userModel.create({
      facebookId: profile.id,
      name: `${profile.first_name} ${profile.last_name}`,
      image_url: profile.picture.data.url,
      role: UserRole.USER,
      lastLoginAt: new Date(),
    });
  }

  async findOrCreateGoogleUser(profile: UserGoogleInfoDto): Promise<UserDocument> {
    const { sub, picture, given_name, family_name } = profile.data;
    let user = await this.userModel.findOne({ googleId: sub }).exec();

    if (user) {
      return this.userModel.findByIdAndUpdate(
        user._id,
        {
          image_url: picture,
          lastLoginAt: new Date(),
        },
        { new: true },
      );
    }

    user = await this.userModel.create({
      googleId: sub,
      name: `${given_name} ${family_name}`,
      image_url: picture,
      role: UserRole.USER,
      lastLoginAt: new Date(),
    });
  }
}
