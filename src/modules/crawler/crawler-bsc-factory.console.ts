import { Injectable } from '@nestjs/common';
import { Command, Console } from 'nestjs-console';
import { CrawlerService } from './crawler.service';
import { bscPoolFactoryContractInfo } from './config/crawler.config';

@Console()
@Injectable()
export class CrawlerBscFactoryConsole {
  constructor(private crawlerService: CrawlerService) {}
  @Command({
    command: 'crawl-bsc-factory',
    description: 'crawl bsc factory',
  })
  async startCrawler(): Promise<void> {
    try {
      await this.crawlerService.start(bscPoolFactoryContractInfo);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }
}
