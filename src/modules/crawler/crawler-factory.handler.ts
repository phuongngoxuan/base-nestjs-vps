// eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-unused-vars
const Web3 = require('web3');
import BigNumber from 'bignumber.js';
BigNumber.config({ EXPONENTIAL_AT: 40 });
import { Injectable } from '@nestjs/common';
import { ContractDto } from './dto/contract.dto';
import { LogEventDto } from './dto/log-event-crawler.dto';
import { ReadScService } from '../read-sc/read-sc.service';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const InputDataDecoder = require('ethereum-input-data-decoder');
import { poolFactoryEventsName } from './config/crawler.config';
import { TransactionCrawlDto } from './dto/transaction-crawl.dto';

@Injectable()
export class FactoryHandler {
  constructor(private readScService: ReadScService) {}
  async handlerEvents(
    events: LogEventDto[],
    contractInfo: ContractDto,
    transaction: TransactionCrawlDto,
  ): Promise<void> {
    for (const eventInfo of events) {
      const { logIndex, transactionHash, event } = eventInfo;
      // check duplicate event
      const eventHistory = await transaction.transactionRepositoryHistory.findOne({
        where: { txHash: transactionHash, logIndex },
      });

      if (!eventHistory) {
        // filter multiple event
        switch (event) {
          case poolFactoryEventsName.linerPoolCreated:
          case poolFactoryEventsName.allocationPoolCreated:
            break;
            // case poolFactoryEventsName.roleGranted:
            // await this.roleGranted(eventInfo, contractInfo, transaction);
            break;
          default:
            break;
        }
      }
    }
  }
}
