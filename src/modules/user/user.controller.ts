import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';

import { User } from './schemas/user.schema';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'test connect database mongo and database sql' })
  async findAll(): Promise<User[]> {
    return this.usersService.getUser();
  }
}
