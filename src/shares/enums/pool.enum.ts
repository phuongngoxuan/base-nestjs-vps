import { enumize } from 'src/shares/enums/enumize';

export const PoolStatus = enumize('LIVE', 'ENDED');
export const PoolType = enumize('LP', 'SINGLE');
export const PoolAPRType = enumize('FIXED', 'DYNAMIC');
export const PoolChain = enumize('BSC', 'KCC');

export const PoolEvents = enumize(
  'LinearDeposit',
  'LinearEmergencyWithdraw',
  'LinearPendingWithdraw',
  'LinearRewardsHarvested',
  'LinearWithdraw',
  'Paused',
  'Unpaused',
  'RewardDisTributor',
);

export const AllocationPoolEvents = enumize('Deposit', 'Paused', 'Unpaused', 'Withdraw', 'Claim', 'PoolEnded');
