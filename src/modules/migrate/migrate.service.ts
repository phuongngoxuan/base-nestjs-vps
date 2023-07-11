import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class MigrateService {
  constructor(private usersService: UserService) {}
}
