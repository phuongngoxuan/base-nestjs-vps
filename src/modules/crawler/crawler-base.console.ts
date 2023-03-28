import { Injectable } from '@nestjs/common';
import { Command, Console } from 'nestjs-console';
import { CrawlerService } from './crawler.service';
import { baseContractInfo } from './config/crawler.config';

@Console()
@Injectable()
export class CrawlerEventNetworkConsole {
  constructor(private crawlerService: CrawlerService) {}
  @Command({
    command: 'crawl-event-network',
    description: 'crawl event network',
  })
  async startCrawler(): Promise<void> {
    try {
      await this.crawlerService.start(baseContractInfo);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }
}
