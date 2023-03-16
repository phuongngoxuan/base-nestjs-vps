export class CreateHistoryTranDto {
  action: string;
  blockNumber: number;
  blockTimestamp: number;
  to: string;
  from: string;
  logIndex: number;
  txHash: string;
  userId: number;
  poolId: number;
  data: string;
}
