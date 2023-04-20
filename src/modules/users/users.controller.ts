import { Controller, Get, Param, Patch, Query, Post, Body } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserDocument } from './schemas/users.schema';
import { GetUsersDto } from './dto/get-users.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUserByIdDto } from './dto/get-user-id.dto';
import { User } from '@sentry/node';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(@Query() query: GetUsersDto): Promise<User[]> {
    return this.usersService.findAll(query);
  }

  @Post()
  @ApiOperation({ summary: 'Create user' })
  async create(@Body() createUserDto: CreateUserDto): Promise<UserDocument> {
    return this.usersService.createUser(createUserDto);
  }

  @Patch(':id')
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
