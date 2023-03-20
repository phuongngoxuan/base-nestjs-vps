export class UserRefreshTokenDto {
  userId: number;
  date: number;
  iat: number;
  exp: number;
  refreshToken: string;
}
