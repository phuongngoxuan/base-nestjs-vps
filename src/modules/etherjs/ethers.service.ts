import { Injectable } from '@nestjs/common';
import { ContractDto } from '../crawler/dto/contract.dto';
import { LogEtherDto } from '../crawler/dto/log-etherjs.dto';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { ethers } = require('ethers');

@Injectable()
export class EthersService {
  getProviders(rpc: string, chain: string): any {
    return new ethers.providers.JsonRpcProvider(rpc, chain);
  }

  // get logs ether js  fromBlock toBlock input
  async getLogs(fromBlock: number, toBlock: number, contractInfo: ContractDto): Promise<LogEtherDto[]> {
    const provider = this.getProviders(contractInfo.rpc, contractInfo.chain);
    return provider.getLogs({ fromBlock, toBlock });
  }
}
