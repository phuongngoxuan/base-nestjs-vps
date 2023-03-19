import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UsersEntity } from 'src/models/entities/users.entity';
import { AuthService } from 'src/modules/auth/auth.service';
import { LoginDto } from 'src/modules/auth/dto/login.dto';
import { ResponseLogin } from 'src/modules/auth/dto/response-login.dto';
import { MailService } from 'src/modules/mail/mail.service';
import { UserService } from 'src/modules/user/users.service';
import { UserID } from 'src/shares/decorators/get-user-id.decorator';
import { ResponseDto } from 'src/shares/dtos/response.dto';
import { ResponseRefreshTokenDto } from './dto/response-refresh-token.dto';
import { AtGuards } from './guards/at.guard';
import { RtGuards } from './guards/rt.guard';
import { UserRefreshTokenDto } from './dto/user-refresh-token.dto';
import { GetCurrentUser } from 'src/shares/decorators/get-current-user.decorators';

@Controller('auth')
@ApiTags('Auth')
@ApiBearerAuth()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly mailService: MailService,
  ) {}

  @Get('/current')
  @UseGuards(AtGuards)
  async currentUser(@UserID() userId: number): Promise<ResponseDto<UsersEntity>> {
    const user = await this.userService.findUserById(userId);
    return {
      data: user,
    };
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<ResponseLogin> {
    return this.authService.login(loginDto);
  }

  @Post('refresh-access-token')
  @UseGuards(RtGuards)
  @ApiBearerAuth('JWT-auth')
  async refreshAccessToken(@GetCurrentUser() user: UserRefreshTokenDto): Promise<ResponseRefreshTokenDto> {
    return this.authService.refreshAccessToken(user);
  }
}
