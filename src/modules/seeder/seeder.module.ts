import { Module } from '@nestjs/common';
import { SeederController } from './seeder.controller';
import { SeederService } from './seeder.service';
import { UserSeederConsole } from './user.seeder.console';

@Module({
  controllers: [SeederController],
  providers: [SeederService,UserSeederConsole],
  exports: [SeederService],
})
export class SeederModule {}
