import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, UpdateQuery } from 'mongoose';
import { User, UserDocument } from './schemas/users.schema';

import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { ChangeAvatarDto } from './dto/change-avatar.dto';

import { UpdateProfileDto } from './dto/update-profile.dto';

// import { UpdateProfileNameDto } from './dto/update-profile-name.dto';
import { UserRole } from 'src/shares/enums/user.enum';

// eslint-disable-next-line @typescript-eslint/no-var-requires
// const Filter = require('bad-words');

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async find(): Promise<UserDocument[]> {
    return this.userModel.find();
  }

  async findOne(condition: any, selectPassword = false): Promise<User> {
    if (selectPassword) {
      return this.userModel.findOne(condition).select('+password').exec();
    }
    return this.userModel.findOne(condition).exec();
  }

  async findById(userId: string): Promise<User> {
    return this.userModel.findById(userId).exec();
  }

  async findByIdPopulate(userId: string): Promise<User> {
    return this.userModel.findById(userId).populate('currentTheme').exec();
  }

  async createUser(createUserDto: CreateUserDto, role: UserRole = UserRole.ADMIN) {
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 12);
      return this.userModel.create({
        ...createUserDto,
        password: hashedPassword,
        role,
      });
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async findOrCreateFacebookUser(profile: any) {
    let user = await this.userModel.findOne({ facebookId: profile.id }).exec();

    if (user) {
      return this.userModel.findByIdAndUpdate(
        user._id,
        {
          'avatar.url': profile.picture.data.url,
          lastLoginAt: new Date(),
        },
        { new: true },
      );
    }
    user = await this.userModel.create({
      facebookId: profile.id,
      name: `${profile.first_name} ${profile.last_name}`,
      'avatar.url': profile.picture.data.url,
      role: UserRole.USER,
      lastLoginAt: new Date(),
    });
  }

  async findByIdAndUpdate(userId: string | Types.ObjectId, update?: UpdateQuery<UserDocument>) {
    return this.userModel.findByIdAndUpdate(userId, update, { new: true });
  }

  async updateProfile(userId: string, updateProfileDto: UpdateProfileDto) {
    const update = {};
    if (updateProfileDto.name) {
      update['name'] = updateProfileDto.name;
    }
    if (updateProfileDto.email) {
      update['email'] = updateProfileDto.email;
    }
    return this.userModel.findByIdAndUpdate(userId, update, { new: true });
  }

  // async updateName(userId: string, data: UpdateProfileNameDto) {
  //   const { name } = data;
  //   const filter = new Filter();
  //   const cleanName = filter.clean(name.trim());
  //   if (cleanName !== name) {
  //     throw new HTTP(ERR.E_0104, { property: 'Name' });
  //   }
  //   return await this.userModel.findByIdAndUpdate(
  //     userId,
  //     {
  //       name: cleanName,
  //     },
  //     { new: true },
  //   );
  // }

  async changeAvatar(userId: string, changeAvatarDto: ChangeAvatarDto) {
    const { avatarId } = changeAvatarDto;
    return this.userModel.findByIdAndUpdate(userId, { 'avatar.id': avatarId }, { new: true });
  }
}
