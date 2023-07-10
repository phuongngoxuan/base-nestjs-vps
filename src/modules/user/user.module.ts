import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { Module } from '@nestjs/common';
import { EmailService } from 'src/shares/helpers/mail.helpers';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [UserService, EmailService],
  controllers: [UserController],
  exports: [UserService],
})
export class UsersModule {}
