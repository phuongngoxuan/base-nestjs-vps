import { Module } from '@nestjs/common';
import { MigrateController } from './migrate.controller';
import { MigrateService } from './migrate.service';
import { MigrateUserConsole } from './migrate-user.console';
import { UsersModule } from '../user/user.module';
import { UserMainConsole } from './migrate-user-main.console';
import { UserMainModule } from '../user-main/user-main.module';

@Module({
  imports: [UsersModule, UserMainModule],
  controllers: [MigrateController],
  providers: [MigrateService, MigrateUserConsole, UserMainConsole],
})
export class MigrateModule {}
