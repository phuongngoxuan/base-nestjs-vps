import { JwtModule } from '@nestjs/jwt';
import { Global, Logger, Module } from '@nestjs/common';
import { MailModule } from 'src/modules/mail/mail.module';
import { UserService } from 'src/modules/user/users.service';
import { jwtConstants } from 'src/modules/auth/auth.constants';
import { UserController } from 'src/modules/user/users.controller';

@Global()
@Module({
  imports: [
    Logger,
    JwtModule.register({
      secret: jwtConstants.accessTokenSecret,
      signOptions: { expiresIn: jwtConstants.accessTokenExpiry },
    }),
    MailModule,
  ],
  providers: [UserService, Logger],
  exports: [UserService],
  controllers: [UserController],
})
export class UsersModule {}
