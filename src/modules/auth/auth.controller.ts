import { GetCurrentUser } from 'src/shares/decorators/get-current-user.decorators';
import { ResponseRefreshTokenDto } from './dto/response-refresh-token.dto';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ResponseLogin } from 'src/modules/auth/dto/response-login.dto';
import { UserID } from 'src/shares/decorators/get-user-id.decorator';
import { PayloadRefreshTokenDto } from './dto/payload-refresh-token.dto';
import { AuthService } from 'src/modules/auth/auth.service';
import { LoginDto } from 'src/modules/auth/dto/login.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from '../user/user.service';
import { RtGuards } from './guards/rt.guard';
import { User } from '@sentry/node';
import { LoginFacebookDto } from './dto/login-facebook.dto';
import { LoginGoogleDto } from './dto/login-google.dto';
import { Auth } from 'src/shares/decorators/http.decorators';

@Controller('auth')
@ApiTags('Auth')
@ApiBearerAuth()
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly userService: UserService) {}

  @Get('/current')
  @Auth()
  @ApiOperation({ summary: 'Get new Access Token' })
  async currentUser(@UserID() userId: string): Promise<User> {
   return this.userService.findById(userId);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login with gmail' })
  async login(@Body() loginDto: LoginDto): Promise<ResponseLogin> {
    return this.authService.login(loginDto);
  }

  
  @Post('refresh-access-token')
  @ApiOperation({ summary: 'Get new Access Token' })
  @UseGuards(RtGuards)
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
