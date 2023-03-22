import { PartialType } from '@nestjs/swagger';
import { UserEntity } from 'src/models/entities/users.entity';

export class ResponseLogin extends PartialType(UserEntity) {
  accessToken: string;
  refreshToken: string;
  iat: number;
  exp: number;
}
