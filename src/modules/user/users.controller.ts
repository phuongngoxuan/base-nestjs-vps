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
  HttpCode,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
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
  @ApiOkResponse()
  async findAll(@Query() getUser: GetUsersDto): Promise<GetUserListRes> {
    return this.userService.findAll(getUser);
  }

  @Post()
  @ApiOperation({ summary: 'Create new user.' })
  @ApiCreatedResponse()
  async create(@Body() createUserDto: CreateUserDto): Promise<UsersEntity> {
    return this.userService.create(createUserDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user by id.' })
  @HttpCode(204)
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto): Promise<void> {
    await this.userService.update(id, updateUserDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id.' })
  @ApiOkResponse()
  async findOne(@Param() getUserDto: GetUserDto): Promise<UsersEntity> {
    return this.userService.findOne(getUserDto.id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Get user by id.' })
  @HttpCode(204)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.userService.delete(id);
  }
}
