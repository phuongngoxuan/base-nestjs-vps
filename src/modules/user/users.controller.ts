import {
  Body,
  Controller,
  ParseIntPipe,
  Patch,
  Get,
  Post,
  Delete,
  Param,
  Query,
} from '@nestjs/common';
import { ApiResponse, ApiBearerAuth, ApiTags, ApiOperation, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { MailService } from 'src/modules/mail/mail.service';
import { UserService } from 'src/modules/user/users.service';
import { UsersEntity } from 'src/models/entities/users.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { GetUsersDto } from './dto/get-users.dto';
import { GetUserListRes } from 'src/shares/interface/paging-response.interface';

@Controller('user')
@ApiBearerAuth()
@ApiTags('User')
export class UserController {
  constructor(private userService: UserService, private readonly mailService: MailService) {}

  @Get()
  @ApiOperation({ summary: 'get all user.' })
  @ApiOkResponse({ description: 'The user has been successfully created'})
  @ApiResponse({ status: 200, description: 'Get all user.' })
  async findAll(@Query() getUser: GetUsersDto): Promise<GetUserListRes> {
    return this.userService.findAll(getUser);
  }

  @Post()
  @ApiOperation({ summary: 'Create new user.' })
  @ApiCreatedResponse({ description: 'The user has been successfully created', type: CreateUserDto })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async create(@Body() createUserDto: CreateUserDto): Promise<UsersEntity> {
    return this.userService.create(createUserDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user by id.' })
  @ApiResponse({ status: 200, description: 'The user has been successfully updated.' })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto): Promise<void> {
    await this.userService.update(id, updateUserDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id.' })
  @ApiOkResponse({ description: 'The user has been successfully retrieved', type: UsersEntity })
  @ApiResponse({ status: 404, description: 'User not found' })
  async findOne(@Param() getUserDto: GetUserDto): Promise<UsersEntity> {
    return this.userService.findOne(getUserDto.id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Get user by id.' })
  @ApiResponse({ status: 204, description: 'The user has been successfully deleted.' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.userService.delete(id);
  }
}
