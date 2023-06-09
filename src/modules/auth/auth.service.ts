import {
  CACHE_MANAGER,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Cache } from 'cache-manager';
import { AUTH_CACHE_PREFIX, JWT_CONSTANTS } from 'src/modules/auth/auth.constants';
import { LoginDto } from 'src/modules/auth/dto/login.dto';
import { ResponseLogin } from 'src/modules/auth/dto/response-login.dto';
import { ResponseRefreshTokenDto } from './dto/response-refresh-token.dto';
import { PayloadRefreshTokenDto } from './dto/payload-refresh-token.dto';
import { httpErrors } from 'src/shares/exceptions';
import { UserService } from '../user/user.service';
import { LoginFacebookDto } from './dto/login-facebook.dto';
import * as config from 'config';
import { HttpService } from '@nestjs/axios';
import { catchError, lastValueFrom, map } from 'rxjs';
import { UserFacebookInfoDto } from './dto/user-facebook-info.dto';
import { UserGoogleInfoDto } from './dto/user-google-info.dto';
import { LoginGoogleDto } from './dto/login-google.dto';
import { validateHash } from 'src/shares/helpers/bcrypt';
import { User } from '../user/schemas/user.schema';
import { PayloadAccessTokenDto } from 'src/shares/dtos/payload-access-token.dto';
const baseFacebookUrl = config.get<string>('facebook.graph_api');
const baseGoogleUrl = config.get<string>('google.base_api');
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private jwtService: JwtService,
    private httpService: HttpService,
  ) {}

  async login(loginDto: LoginDto): Promise<ResponseLogin> {
    const { email, password } = loginDto;
    const user = await this.userService.findOne({ email }, true);
    
    if (!user) {
      throw new BadRequestException(httpErrors.ACCOUNT_NOT_FOUND);
    }

    if (!(await validateHash(password, user.password))) {
      throw new UnauthorizedException(httpErrors.UNAUTHORIZED);
    }

    const [accessToken, refreshToken] = await Promise.all([
      this.generateAccessToken(user),
      this.generateRefreshToken(user),
    ]);

    return {
      accessToken,
      refreshToken,
      iat: Date.now(),
      exp: Date.now() + JWT_CONSTANTS.accessTokenExpiry,
    };
  }

  async refreshAccessToken(payload: PayloadRefreshTokenDto): Promise<ResponseRefreshTokenDto> {
    const { refreshToken, userId } = payload;
    const userInfo = await this.userService.findById(userId.toString());

    const oldRefreshToken = await this.cacheManager.get<string>(`${AUTH_CACHE_PREFIX}${userId}`);
    if (!oldRefreshToken) throw new HttpException(httpErrors.REFRESH_TOKEN_EXPIRED, HttpStatus.BAD_REQUEST);

    if (refreshToken === oldRefreshToken) {
      const [newAccessToken, newRefreshToken] = await Promise.all([
        this.generateAccessToken(userInfo),
        this.generateRefreshToken(userInfo),
      ]);
      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        iat: Date.now(),
        exp: Date.now() + JWT_CONSTANTS.accessTokenExpiry,
      };
    } else throw new HttpException(httpErrors.REFRESH_TOKEN_EXPIRED, HttpStatus.BAD_REQUEST);
  }

  async generateAccessToken(user: User): Promise<string> {
    const { _id, role } = user;
    return this.jwtService.signAsync(
      {
        userId: _id,
        role: role,
        date: Date.now(),
      },
      {
        secret: JWT_CONSTANTS.accessTokenSecret,
        expiresIn: JWT_CONSTANTS.accessTokenExpiry,
      },
    );
  }

  async generateRefreshToken(user: User): Promise<string> {
    const { _id, role } = user;
    const refreshToken = await this.jwtService.signAsync(
      {
        userId: _id,
        role: role,
        date: Date.now(),
      },
      {
        secret: JWT_CONSTANTS.refreshTokenSecret,
        expiresIn: JWT_CONSTANTS.refreshTokenExpiry,
      },
    );

    await this.cacheManager.set<string>(`${AUTH_CACHE_PREFIX}${_id}`, refreshToken, {
      ttl: JWT_CONSTANTS.refreshTokenExpiry,
    });

    return refreshToken;
  }

  async decodeAccessToken(accessToken: string): Promise<PayloadAccessTokenDto | any> {
    return this.jwtService.decode(accessToken);
  }

  async loginFacebook(loginFacebookDto: LoginFacebookDto): Promise<ResponseLogin> {
    const { accessToken } = loginFacebookDto;
    const url = `${baseFacebookUrl}me?fields=id,first_name,last_name,picture&access_token=${accessToken}`;
    const userData: UserFacebookInfoDto = await lastValueFrom(
      this.httpService
        .get(url)
        .pipe(
          map((response) => {
            return response.data || null;
          }),
        )
        .pipe(
          catchError((error) => {
            throw new BadRequestException(error.message);
          }),
        ),
    );

    if (!userData) {
      throw new BadRequestException(httpErrors.FACEBOOK_TOKEN_INVALID_OR_EXPIRES);
    }

    const user = await this.userService.findOrCreateFacebookUser(userData);
    const [accessToken_, refreshToken] = await Promise.all([
      this.generateAccessToken(user._id),
      this.generateRefreshToken(user._id),
    ]);

    return {
      accessToken: accessToken_,
      refreshToken,
      iat: Date.now(),
      exp: Date.now() + JWT_CONSTANTS.accessTokenExpiry,
    };
  }

  async logInGoogle(loginGoogleDto: LoginGoogleDto): Promise<any> {
    const { accessToken } = loginGoogleDto;
    const url = `${baseGoogleUrl}userinfo?access_token=${accessToken}`;

    const userData: UserGoogleInfoDto = await lastValueFrom(
      this.httpService
        .get(url)
        .pipe(
          map((response) => {
            return response || null;
          }),
        )
        .pipe(
          catchError((error) => {
            throw new BadRequestException(error.message);
          }),
        ),
    );

    if (!userData) {
      throw new BadRequestException(httpErrors.GOOGLE_TOKEN_INVALID_OR_EXPIRES);
    }

    const user = await this.userService.findOrCreateGoogleUser(userData);
    const [accessToken_, refreshToken] = await Promise.all([
      this.generateAccessToken(user._id),
      this.generateRefreshToken(user._id),
    ]);

    return {
      accessToken: accessToken_,
      refreshToken,
      iat: Date.now(),
      exp: Date.now() + JWT_CONSTANTS.accessTokenExpiry,
    };
  }
}
