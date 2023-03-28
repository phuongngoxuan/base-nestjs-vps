import { Module } from '@nestjs/common';
import { Web3jsController } from './web3js.controller';
import { Web3jsService } from './web3js.service';

@Module({
  controllers: [Web3jsController],
  providers: [Web3jsService],
  exports: [Web3jsService],
})
export class Web3jsModule {}
