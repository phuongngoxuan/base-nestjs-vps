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
import { AUTH_CACHE_PREFIX, jwtConstants } from 'src/modules/auth/auth.constants';
import { LoginDto } from 'src/modules/auth/dto/login.dto';
import { ResponseLogin } from 'src/modules/auth/dto/response-login.dto';
import { UserService } from 'src/modules/user/users.service';
import { httpErrors } from 'src/shares/const/http-errors.const';
import * as bcrypt from 'bcryptjs';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../../models/repositories/users.repository';
import { ResponseRefreshTokenDto } from './dto/response-refresh-token.dto';
import { UserRefreshTokenDto } from './dto/user-refresh-token.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private jwtService: JwtService,
    @InjectRepository(UserRepository, 'report') private usersRepositoryReport: UserRepository,
  ) {}

  async login(loginDto: LoginDto): Promise<ResponseLogin> {
    const { email, password } = loginDto;

    // verify user email
    const user = await this.usersRepositoryReport.findOne({ email });
    if (!user) {
      throw new BadRequestException(httpErrors.ACCOUNT_NOT_FOUND);
    }

    // verify user password
    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException(httpErrors.UNAUTHORIZED);
    }

    const [accessToken, refreshToken] = await Promise.all([
      this.generateAccessToken(user.id),
      this.generateRefreshToken(user.id),
    ]);

    return {
      accessToken,
      refreshToken,
      iat: Date.now(),
      exp: Date.now() + jwtConstants.accessTokenExpiry,
    };
  }

  async refreshAccessToken(user: UserRefreshTokenDto): Promise<ResponseRefreshTokenDto> {
    const { refreshToken, userId } = user;

    const oldRefreshToken = await this.cacheManager.get<string>(`${AUTH_CACHE_PREFIX}${userId}`);
    if (!oldRefreshToken) throw new HttpException(httpErrors.REFRESH_TOKEN_EXPIRED, HttpStatus.BAD_REQUEST);

    if (refreshToken === oldRefreshToken) {
      const [newAccessToken, newRefreshToken] = await Promise.all([
        this.generateAccessToken(userId),
        this.generateRefreshToken(userId),
      ]);
      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        iat: Date.now(),
        exp: Date.now() + jwtConstants.accessTokenExpiry,
      };
    } else throw new HttpException(httpErrors.REFRESH_TOKEN_EXPIRED, HttpStatus.BAD_REQUEST);
  }

  async generateAccessToken(userId: number): Promise<string> {
    return this.jwtService.signAsync(
      {
        userId,
        date: Date.now(),
      },
      {
        secret: jwtConstants.accessTokenSecret,
        expiresIn: jwtConstants.accessTokenExpiry,
      },
    );
  }

  async generateRefreshToken(userId: number): Promise<string> {
    const refreshToken = await this.jwtService.signAsync(
      {
        userId,
        date: Date.now(),
      },
      {
        secret: jwtConstants.refreshTokenSecret,
        expiresIn: jwtConstants.refreshTokenExpiry,
      },
    );

    await this.cacheManager.set<string>(`${AUTH_CACHE_PREFIX}${userId}`, refreshToken, {
      ttl: jwtConstants.refreshTokenExpiry,
    });

    return refreshToken;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async decodeAccessToken(accessToken: string): Promise<any> {
    return this.jwtService.decode(accessToken);
  }
}
