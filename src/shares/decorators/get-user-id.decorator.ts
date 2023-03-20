import { createParamDecorator, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import jwtDecode from 'jwt-decode';
import { httpErrors } from 'src/shares/const/http-errors.const';

export const UserID = createParamDecorator((data: string, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  try {
    const token = request.headers.authorization;
    const payload = jwtDecode(token);
    return payload['userId'];
  } catch (e) {
    throw new HttpException(httpErrors.UNAUTHORIZED, HttpStatus.BAD_REQUEST);
  }
});
