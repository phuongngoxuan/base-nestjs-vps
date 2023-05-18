import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: string[]): MethodDecorator & ClassDecorator => {
  return SetMetadata('roles', roles);
};