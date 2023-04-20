import { ObjectId } from 'mongoose';

export class UserRefreshTokenDto {
  userId: ObjectId;
  date: number;
  iat: number;
  exp: number;
  refreshToken: string;
}
