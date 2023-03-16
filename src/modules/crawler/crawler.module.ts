import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CrawlerService } from './crawler.service';
import { EventModule } from '../events/event.module';
import { ReadScModule } from '../read-sc/read-sc.module';
import { HistoryModule } from '../history/history.module';
import { FactoryHandler } from './crawler-factory.handler';
import { CrawlerBscFactoryConsole } from './crawler-bsc-factory.console';

@Module({
  exports: [CrawlerService],
  imports: [EventModule, ReadScModule, HttpModule, HistoryModule],
  providers: [CrawlerService, FactoryHandler, CrawlerBscFactoryConsole],
})
export class CrawlerModule {}
