import { LogEventDto } from './log-event-crawler.dto';
export class ContractDto {
  abi: any[];
  contractAddress: string;
  rpc: string;
  firstCrawlBlock: number;
  contractName: string;
  maxRange: number;
  chain?: string;
  aprType?: string;
}

export class GetBlockDto {
  latestBlockInSC: number;
  blockInDB: number;
}
export class IEventLogCrawlerOptions {
  eventLogs: LogEventDto;
  lastBlockNumber: number;
}
