import * as config from 'config';
import { abiERC20 } from 'src/abis/ERC20.json';
import { ContractDto } from '../dto/contract.dto';
const rpc = config.get<{ message: string }>('rpc');

export const messageErrorRpc = rpc.message || 'JSON RPC';

export const baseContractInfo: ContractDto = {
  abi: abiERC20, // file abi.json
  contractAddress: process.env.BASE_CONTRACT_ADDRESS, // contract address
  rpc: process.env.RPC,
  firstCrawlBlock: Number(process.env.FIRST_CRAWLER_BLOCK), // block start crawler transaction in smart contract
  contractName: 'base_staking_history', // name the contract to use differently if the crawler has more than one sc
  maxRange: Number(process.env.MAX_RANGE) || 1000, // block distance
};

export const baseCrawlerAllNetwork = {
  rpc: process.env.RPC,
  firstCrawlBlock: Number(process.env.FIRST_CRAWLER_BLOCK),
  contractName: 'base_crawler_all_network',
  maxRange: Number(process.env.MAX_RANGE) || 1000,
};

export const eventsName = {
  stake: 'Stake',
  boost: 'Boost',
  transfer: 'Transfer',
};
