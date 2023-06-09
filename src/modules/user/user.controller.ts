import { Controller, Get, Param, Patch, Query, Post, Body } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { GetUsersDto } from './dto/get-users.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUserByIdDto } from './dto/get-user-id.dto';
import ChangePasswordDto from './dto/change-password.dto';
import ChangePasswordByCodeDto from './dto/change-password-by-code.dto';
import { User } from './schemas/user.schema';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { SignUpByCodeDto } from './dto/sign-up-by-code.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post('sign-up')
  @ApiOperation({ summary: 'Sign Up with gmail' })
  async signUp(@Body() signUpDto: SignUpDto): Promise<void> {
    await this.usersService.signUp(signUpDto);
  }

  @Post('sign-up-by-code')
  @ApiOperation({ summary: 'Verification user' })
  async signUpByCode(@Body() signUpByCodeDto: SignUpByCodeDto): Promise<void> {
    return this.usersService.signUpByCode(signUpByCodeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all user' })
  async findAll(@Query() query: GetUsersDto): Promise<User[]> {
    return this.usersService.findAll(query);
  }

  @Post('forgot-password')
  @ApiOperation({ summary: 'Get code change password by send email' })
  forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto): Promise<void> {
    return this.usersService.forgotPassword(forgotPasswordDto);
  }

  @Post('change-password-by-code')
  @ApiOperation({ summary: 'Change User password by code' })
  changePasswordByCode(@Body() changePasswordByCodeDto: ChangePasswordByCodeDto): Promise<void> {
    return this.usersService.changePasswordByCode(changePasswordByCodeDto);
  }

  @Post('change-password')
  @ApiOperation({ summary: 'Change User password' })
  changePassword(@Body() changePasswordDto: ChangePasswordDto): Promise<void> {
    return this.usersService.changePassword(changePasswordDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update User by id' })
  @ApiResponse({ status: 200, description: 'The user has been successfully updated.' })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.usersService.findByIdAndUpdate(id, updateUserDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  @ApiOkResponse({ description: 'The user has been successfully retrieved' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async findById(@Param() getUserByIdDto: GetUserByIdDto): Promise<User> {
    return this.usersService.findById(getUserByIdDto.id);
  }
}
