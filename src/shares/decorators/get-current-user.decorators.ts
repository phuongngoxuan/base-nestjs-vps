import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetCurrentUser = createParamDecorator((data: string | undefined, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();
  console.log('request.user_______________________', request.user);
  if (!data) return request.user;
  console.log('request.user[`${data}`________________________',request.user[`${data}`]);
  return request.user[`${data}`];
});
