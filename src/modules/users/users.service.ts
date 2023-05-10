import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/users.schema';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { UserRole } from 'src/shares/enums/user.enum';
import { GetUsersDto } from './dto/get-users.dto';
import { GetUserDto } from './dto/get-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { httpErrors } from 'src/shares/exceptions';
import { UserFacebookInfoDto } from '../auth/dto/user-facebook-info.dto';
import { UserGoogleInfoDto } from '../auth/dto/user-google-info.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { email, password } = createUserDto;
    const user = await this.userModel.findOne({ email });
    if (user) {
      throw new BadRequestException(httpErrors.ACCOUNT_EXISTED);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    return this.userModel.create({
      ...createUserDto,
      password: hashedPassword,
    });
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
