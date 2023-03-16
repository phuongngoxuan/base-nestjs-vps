import { Module } from '@nestjs/common';
import { SeederController } from './seeder.controller';
import { SeederService } from './seeder.service';
import { TokenSeederConsole } from './token.seeder.console';
import { UserSeederConsole } from './user.seeder.console';

@Module({
  controllers: [SeederController],
  providers: [SeederService,UserSeederConsole,TokenSeederConsole],
  exports: [SeederService],
})
export class SeederModule {}
