// eslint-disable-next-line @typescript-eslint/no-var-requires
const Web3 = require('web3');
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { BlockInfoDto } from '../crawler/dto/bock-infos.dto';
import { ContractDto } from '../crawler/dto/contract.dto';
import { LogEventDto } from '../crawler/dto/log-event-crawler.dto';

@Injectable()
export class Web3jsService {
  getProvider(rpc: string): any {
    const web3Provider = new Web3.providers.HttpProvider(rpc);
    return new Web3(web3Provider);
  }

  // get time in block
  public async getBlockTimestamp(block: number, rpc: string): Promise<number> {
    const web3Provider = new Web3.providers.HttpProvider(rpc);
    const web3 = new Web3(web3Provider);

    // Get block can false in testnet not good for performance (pending)
    for (let i = 0; i < 100; i++) {
      const blockInfo: BlockInfoDto = await web3.eth.getBlock(block);
      if (blockInfo) return blockInfo.timestamp;
    }

    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        error: `Couldn't find blockInfo`,
      },
      HttpStatus.NOT_FOUND,
    );
  }

  // get logs fromBlock toBlock input
  async getPastEvents(fromBlockNumber: number, toBlockNumber: number, contract: ContractDto): Promise<LogEventDto[]> {
    const web3 = this.getProvider(contract.rpc);
    const contractWeb3 = new web3.eth.Contract(contract.abi, contract.contractAddress);
    const eventLogs: LogEventDto[] = await contractWeb3.getPastEvents(
      'allEvents',
      {
        fromBlock: fromBlockNumber,
        toBlock: toBlockNumber,
      },
      (err) => {
        if (err) {
          console.error(err);
        }
      },
    );

    return eventLogs;
  }

  async getTransaction(rpc: string, transaction: string): Promise<any> {
    const web3 = this.getProvider(rpc);
    return web3.eth.getTransaction(transaction);
  }

  public async checkSumAddress(walletAddress: string): Promise<boolean> {
    const web3 = this.getProvider(process.env.RPC);
    const addressConvert = web3.utils.toChecksumAddress(walletAddress);
    if (addressConvert) return true;
  }
}
