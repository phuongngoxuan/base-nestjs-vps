import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CrawlerService } from './crawler.service';
import { EventModule } from '../events/event.module';

import { HistoryModule } from '../history/history.module';
import { HandlerEvent } from './crawler-base.handler';
import { CrawlerEventNetworkConsole } from './crawler-base.console';
import { Web3jsModule } from '../web3js/web3js.module';
import { EthersModule } from '../etherjs/ethers.module';

@Module({
  exports: [CrawlerService],
  imports: [EventModule, Web3jsModule, EthersModule, HttpModule, HistoryModule],
  providers: [CrawlerService, HandlerEvent, CrawlerEventNetworkConsole],
})
export class CrawlerModule {}
