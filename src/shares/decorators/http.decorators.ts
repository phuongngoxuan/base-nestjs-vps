import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { UserRole } from '../enums/user.enum';
import { AtGuards } from 'src/modules/auth/guards/at.guard';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';

export const Roles = (roles: string[]): MethodDecorator & ClassDecorator => {
  return SetMetadata('roles', roles);
};

export const Auth = (userRole?: UserRole[]): MethodDecorator & ClassDecorator => {
  return applyDecorators(UseGuards(AtGuards, RolesGuard), Roles(userRole));
};
