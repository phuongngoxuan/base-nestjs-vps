import { GetCurrentUser } from 'src/shares/decorators/get-current-user.decorators';
import { ResponseRefreshTokenDto } from './dto/response-refresh-token.dto';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ResponseLogin } from 'src/modules/auth/dto/response-login.dto';
import { UserID } from 'src/shares/decorators/get-user-id.decorator';
import { PayloadRefreshTokenDto } from './dto/payload-refresh-token.dto';
import { AuthService } from 'src/modules/auth/auth.service';
import { LoginDto } from 'src/modules/auth/dto/login.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from '../users/user.service';
import { AtGuards } from './guards/at.guard';
import { RtGuards } from './guards/rt.guard';
import { ObjectId } from 'mongoose';
import { User } from '@sentry/node';
import { LoginFacebookDto } from './dto/login-facebook.dto';
import { LoginGoogleDto } from './dto/login-google.dto';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from 'src/shares/decorators/roles.decorator';
import { UserRole } from 'src/shares/enums/user.enum';

@Controller('auth')
@ApiTags('Auth')
@ApiBearerAuth()
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly userService: UserService) {}

  @Get('/current')
  @ApiOperation({ summary: 'Get new Access Token' })
  @Roles(UserRole.ADMIN,UserRole.USER)
  @UseGuards(AtGuards, RolesGuard)
  async currentUser(@UserID() userId: ObjectId): Promise<User> {
    const user = await this.userService.findById(userId.toString());
    return {
      data: user,
    };
  }

  @Post('login')
  @ApiOperation({ summary: 'Login with gmail' })
  async login(@Body() loginDto: LoginDto): Promise<ResponseLogin> {
    return this.authService.login(loginDto);
  }

  @Post('refresh-access-token')
  @ApiOperation({ summary: 'Get new Access Token' })
  @UseGuards(RtGuards)
  @ApiBearerAuth('JWT-auth')
  async refreshAccessToken(@GetCurrentUser() user: PayloadRefreshTokenDto): Promise<ResponseRefreshTokenDto> {
    return this.authService.refreshAccessToken(user);
  }

  @Post('facebook/login')
  @ApiOperation({ summary: 'Login with facebook' })
  async loginFacebook(@Body() loginFacebookDto: LoginFacebookDto): Promise<ResponseLogin> {
    return this.authService.loginFacebook(loginFacebookDto);
  }

  @Post('google/login')
  @ApiOperation({ summary: 'Login with google' })
  async logInGoogle(@Body() loginInstagramDto: LoginGoogleDto): Promise<ResponseLogin> {
    return this.authService.logInGoogle(loginInstagramDto);
  }
}
