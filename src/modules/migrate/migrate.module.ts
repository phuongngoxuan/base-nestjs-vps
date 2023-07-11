import { Module } from '@nestjs/common';
import { MigrateController } from './migrate.controller';
import { MigrateService } from './migrate.service';
import { MigrateUserConsole } from './migrate.console';
import { UsersModule } from '../user/user.module';

@Module({
  imports: [UsersModule],
  controllers: [MigrateController],
  providers: [MigrateService, MigrateUserConsole],
})
export class MigrateModule {}
