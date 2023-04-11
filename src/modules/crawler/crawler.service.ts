import { Injectable } from '@nestjs/common';
import { sleep } from 'src/shares/helpers/utils';
import { HandlerEvent } from './crawler-base.handler';
import { ContractDto, GetBlockDto } from './dto/contract.dto';
import { UsersEntity } from '../../models/entities/users.entity';
import { TransactionCrawlDto } from './dto/transaction-crawl.dto';
import { UserInfoEntity } from 'src/models/entities/user-info.entity';
import { HistoriesEntity } from '../../models/entities/histories.entity';
import { Repository, Transaction, TransactionRepository } from 'typeorm';
import { CrawlEntity } from '../../models/entities/crawler-status.entity';
import { baseContractInfo } from './config/crawler.config';
import { EthersService } from '../etherjs/ethers.service';
import { Web3jsService } from '../web3js/web3js.service';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Web3 = require('web3');

@Injectable()
export class CrawlerService {
  constructor(
    private factoryHandler: HandlerEvent,
    private ethersService: EthersService,
    private web3jsService: Web3jsService,
  ) {}
  // function crawler can be reused many times with parameter contractInfo
  async start(contractInfo: ContractDto): Promise<void> {
    let passed = true;
    console.log('_____________In ⬇ Crawl_____________');
    while (passed === true) {
      console.log('_____________Start ⬇ Crawl_____________');
      passed = false;
      await this.rootControllerCrawl(contractInfo);
      passed = true;
      console.log('_____________End ⬆ Crawl_____________');
      await sleep(3000);
    }
  }
  @Transaction({ connectionName: 'master' })
  async rootControllerCrawl(
    contractInfo: ContractDto,
    @TransactionRepository(UsersEntity) transactionRepositoryUser?: Repository<UsersEntity>,
    @TransactionRepository(CrawlEntity) transactionRepositoryCrawl?: Repository<CrawlEntity>,
    @TransactionRepository(UserInfoEntity) transactionRepositoryUserInfo?: Repository<UserInfoEntity>,
    @TransactionRepository(HistoriesEntity) transactionRepositoryHistory?: Repository<HistoriesEntity>,
  ): Promise<void> {
    const transaction: TransactionCrawlDto = {
      transactionRepositoryUser,
      transactionRepositoryCrawl,
      transactionRepositoryHistory,
      transactionRepositoryUserInfo,
    };
    const { latestBlockInSC, blockInDB } = await this.getBlockSCAndBlockDB(contractInfo, transaction);
    // check block validate
    const isValidate: boolean = this.isBlockValid(latestBlockInSC, blockInDB);
    if (isValidate) {
      await this.crawlerController(blockInDB, latestBlockInSC, contractInfo, transaction);
    }
  }

  async getBlockSCAndBlockDB(Contract: ContractDto, transaction: TransactionCrawlDto): Promise<GetBlockDto> {
    const [latestBlockInSC, blockInDB] = await Promise.all([
      this.getLatestBlock(Contract),
      this.getBlockNumberInDB(Contract, transaction),
    ]);

    return { latestBlockInSC, blockInDB };
  }

  // check block valid
  isBlockValid(latestBlockInSC: number, blockInDB: number): boolean {
    if (blockInDB >= latestBlockInSC) {
      console.log('----------Waiting for new blocks----------');
      return false;
    } else {
      return true;
    }
  }

  async crawlerController(
    blockInDB: number,
    latestBlockInSC: number,
    contractInfo: ContractDto,
    transaction: TransactionCrawlDto,
  ): Promise<void> {
    const fromBlock: number = blockInDB;
    const toBlock: number = this.getToBlock(latestBlockInSC, blockInDB, contractInfo.maxRange);
    await this.handlerContract(contractInfo, transaction, fromBlock, toBlock);
  }

  async handlerContract(
    contractInfo: ContractDto,
    transaction: TransactionCrawlDto,
    fromBlock: number,
    toBlock: number,
  ): Promise<void> {
    const log = await this.ethersService.getLogs(fromBlock, toBlock, contractInfo);
    console.log('total log:', log.length);
    await this.updateBlockCrawlSuccess(toBlock, contractInfo, transaction);
    // // filter smart contract
    // switch (contractInfo.contractName) {
    //   // Handler factory pool
    //   case baseContractInfo.contractName:
    //     console.log(log);
    //     if (log.length > 0) {
    //       await this.factoryHandler.handlerEvents(log, contractInfo, transaction);
    //     }

    //     break;
    //   default:
    //     break;
    // }
  }

  async updateBlockCrawlSuccess(
    toBlock: number,
    contract: ContractDto,
    transaction: TransactionCrawlDto,
  ): Promise<void> {
    const blockNumber = Number(toBlock);
    await transaction.transactionRepositoryCrawl.update({ contractName: contract.contractName }, { blockNumber });
    console.log('update block new block--' + toBlock);
  }

  // calculate toBlock number
  getToBlock(latestBlockInSC: number, blockInDB: number, maxRange: number): number {
    if (latestBlockInSC - blockInDB < maxRange) {
      return latestBlockInSC;
    } else {
      return blockInDB + maxRange;
    }
  }

  // get block number in db
  async getBlockNumberInDB(contract: ContractDto, transaction: TransactionCrawlDto): Promise<number> {
    const { contractName, contractAddress, firstCrawlBlock } = contract;
    const log = await transaction.transactionRepositoryCrawl.findOne({
      where: { contractName },
    });

    if (!log) {
      // create new record crawlerInfo in database
      await transaction.transactionRepositoryCrawl.save({
        contractAddress: contractAddress,
        blockNumber: firstCrawlBlock,
        contractName,
      });
      return firstCrawlBlock;
    } else {
      return Number(log.blockNumber);
    }
  }

  // get late block - 1
  async getLatestBlock(config: ContractDto): Promise<number> {
    const web3Provider = new Web3.providers.HttpProvider(config.rpc);
    const web3 = new Web3(web3Provider);
    const latestBlock = await web3.eth.getBlockNumber();
    return latestBlock - 1;
  }
}
