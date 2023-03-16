// eslint-disable-next-line @typescript-eslint/no-var-requires
const Web3 = require('web3');
import { BlockInfoDto } from './dto/bock-infos.dto';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class ReadScService {
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

  public async checkSumAddress(walletAddress: string): Promise<any> {
    const web3Provider = new Web3.providers.HttpProvider(process.env.RPC);
    const web3 = new Web3(web3Provider);
    const addressConvert = web3.utils.toChecksumAddress(walletAddress);
    if (addressConvert) return true;
  }
}
