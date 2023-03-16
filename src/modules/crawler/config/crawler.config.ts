import { PoolChain } from 'src/shares/enums/pool.enum';
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

export const eventsName = {
  stake: 'Stake',
  boost: 'Boost',
  unStake: 'Unstake',
  deposit: 'Deposit',
  claimReward: 'ClaimReward',
  claimBaseRewards: 'ClaimBaseRewards',
  claimMultipleReward: 'ClaimMultipleReward',
};

export const bscPoolFactoryContractInfo: ContractDto = {
  abi: abiERC20,
  contractAddress: process.env.BSC_POOL_FACTORY_ADDRESS,
  rpc: process.env.BSC_RPC,
  firstCrawlBlock: Number(process.env.BSC_FIRST_CRAWLER_BLOCK),
  contractName: 'bsc_factory_pool',
  maxRange: Number(process.env.BSC_MAX_RANGE) || 1000,
  chain: PoolChain.BSC,
};

export const poolFactoryEventsName = {
  deposit: 'Deposit',
  roleGranted: 'RoleGranted',
  linearDeposit: 'LinearDeposit',
  linearWithdraw: 'LinearWithdraw',
  claimBaseRewards: 'ClaimBaseRewards',
  adminRecoverFund: 'AdminRecoverFund',
  linerPoolCreated: 'LinerPoolCreated',
  claimMultipleReward: 'ClaimMultipleReward',
  linearPendingWithdraw: 'LinearPendingWithdraw',
  allocationPoolCreated: 'AllocationPoolCreated',
  linearEmergencyWithdraw: 'LinearEmergencyWithdraw',
};
