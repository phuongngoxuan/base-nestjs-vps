import { PartialType } from '@nestjs/swagger';
import { UsersEntity } from 'src/models/entities/users.entity';

export class ResponseLogin extends PartialType(UsersEntity) {
  accessToken: string;
}
