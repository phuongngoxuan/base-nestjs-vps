import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UsersEntity } from 'src/models/entities/users.entity';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'test connect database mongo and database sql' })
  async findAll(): Promise<UsersEntity[]> {
    return this.usersService.getUsersSql();
  }
}
