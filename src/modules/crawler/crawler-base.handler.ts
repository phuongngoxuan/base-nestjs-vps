// eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-unused-vars
const Web3 = require('web3');
import BigNumber from 'bignumber.js';
BigNumber.config({ EXPONENTIAL_AT: 40 });
import { Injectable } from '@nestjs/common';
import { ContractDto } from './dto/contract.dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const InputDataDecoder = require('ethereum-input-data-decoder');
import { TransactionCrawlDto } from './dto/transaction-crawl.dto';
import { baseContractInfo, eventsName } from './config/crawler.config';
import { LogEtherDto } from './dto/log-etherjs.dto';
import { Web3jsService } from '../web3js/web3js.service';

@Injectable()
export class HandlerEvent {
  constructor(private web3jsService: Web3jsService) {}
  async handlerEvents(logs: LogEtherDto[], contractInfo: ContractDto, transaction: TransactionCrawlDto): Promise<void> {
    // filter contract address example: collection address
    for (const log of logs) {
      const { address } = log;
      switch (address) {
        case baseContractInfo.contractAddress:
          await this.handlerEvent(log, contractInfo, transaction);
          break;
        default:
          break;
      }
    }
  }

  async handlerEvent(logs: LogEtherDto, contractInfo: ContractDto, transaction: TransactionCrawlDto): Promise<void> {
    const { logIndex, transactionHash, blockNumber } = logs;

    // crawler event block
    const events = await this.web3jsService.getPastEvents(blockNumber, blockNumber + 1, contractInfo);

    // check duplicate event
    const eventHistory = await transaction.transactionRepositoryHistory.findOne({
      where: { txHash: transactionHash, logIndex },
    });

    if (!eventHistory) {
      for (const eventInfo of events) {
        // filter multiple event example: Transfer, Stake
        switch (eventInfo.event) {
          case eventsName.transfer:
            console.log('in handler event');
            break;
          default:
            break;
        }
      }
    }
  }
}
