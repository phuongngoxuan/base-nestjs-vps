import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [HistoryController],
  providers: [HistoryService],
  exports: [HistoryService],
})
export class HistoryModule {}
