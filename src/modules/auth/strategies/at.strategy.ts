import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JWT_CONSTANTS } from '../auth.constants';
import express from 'express';
import { AuthService } from '../auth.service';
import { UserService } from 'src/modules/user/user.service';
import { httpErrors } from 'src/shares/exceptions';
import { PayloadAccessTokenDto } from 'src/shares/dtos/payload-access-token.dto';

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly userService: UserService, private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_CONSTANTS.accessTokenSecret,
      passReqToCallback: true,
    });
  }

  async validate(req: express.Request, args: PayloadAccessTokenDto): Promise<any> {
    const accessToken = req.headers['authorization']?.split(' ')[1] || '';
    const authenticatedUser = await this.authService.decodeAccessToken(accessToken);
    if (!authenticatedUser) {
      throw new UnauthorizedException('UNAUTHORIZED');
    }

    const user = await this.userService.findById(args.userId);
    if (!user) {
      console.log('user not found');
      throw new UnauthorizedException();
    }

    if (user.banned) {
      throw new UnauthorizedException(httpErrors.LOCKED_USER);
    }

    return user;
  }
}
