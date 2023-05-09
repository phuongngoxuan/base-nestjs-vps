import { GetCurrentUser } from 'src/shares/decorators/get-current-user.decorators';
import { ResponseRefreshTokenDto } from './dto/response-refresh-token.dto';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ResponseLogin } from 'src/modules/auth/dto/response-login.dto';
import { UserID } from 'src/shares/decorators/get-user-id.decorator';
import { UserRefreshTokenDto } from './dto/user-refresh-token.dto';
import { AuthService } from 'src/modules/auth/auth.service';
import { LoginDto } from 'src/modules/auth/dto/login.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from '../users/users.service';
import { AtGuards } from './guards/at.guard';
import { RtGuards } from './guards/rt.guard';
import { ObjectId } from 'mongoose';
import { User } from '@sentry/node';
import { LoginFacebookDto } from './dto/login-facebook.dto';
import { LoginGoogleDto } from './dto/login-google.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { VerifyUserDto } from './dto/verification-user.dto';
// import ForgotPasswordDto from './dto/forgotPassword.dto';

@Controller('auth')
@ApiTags('Auth')
@ApiBearerAuth()
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly userService: UsersService) {}

  @Get('/current')
  @ApiOperation({ summary: 'Get new Access Token' })
  @UseGuards(AtGuards)
  async currentUser(@UserID() userId: ObjectId): Promise<User> {
    const user = await this.userService.findById(userId.toString());
    return {
      data: user,
    };
  }

  @Post('sign-up')
  @ApiOperation({ summary: 'Sign Up with gmail' })
  async signUp(@Body() signUpDto: SignUpDto): Promise<User> {
    return this.authService.signUp(signUpDto);
  }

  @Post('verification')
  @ApiOperation({ summary: 'Verification user' })
  async verificationUser(@Body() verifyUserDto: VerifyUserDto): Promise<User> {
    return this.authService.verificationUser(verifyUserDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login with gmail' })
  async login(@Body() loginDto: LoginDto): Promise<ResponseLogin> {
    return this.authService.login(loginDto);
  }

  // @Post('forgot-password')
  // forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto): Promise<any> {
  //   return this.authService.forgotPassword(forgotPasswordDto);
  // }
  // @Post('change-password-by-code')
  // changePasswordByCode(@Body() changePasswordByCode: ChangePasswordByCode) {
  //   return this.administratorsService.changePasswordByCode(changePasswordByCode);
  // }
  // @Post('change-password')
  // changePassword(@Body() changePasswordDto: ChangePasswordDto) {
  //   return this.administratorsService.changePassword(changePasswordDto);
  // }

  @Post('refresh-access-token')
  @ApiOperation({ summary: 'Get new Access Token' })
  @UseGuards(RtGuards)
  @ApiBearerAuth('JWT-auth')
  async refreshAccessToken(@GetCurrentUser() user: UserRefreshTokenDto): Promise<ResponseRefreshTokenDto> {
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
