import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { UserPoolEntity } from './user-pools.entity';
import { TokenPoolsEntity } from './token-pools.entity';

@Entity('pools')
export class PoolsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({})
  address: string;

  @Column({ name: 'stake_tokens' })
  stakeTokens: string;

  @Column({ name: 'reward_tokens' })
  rewardTokens: string;

  @Column({
    name: 'chain',
  })
  chain: string;

  @Column({ name: 'multiplier' })
  multiplier: string;

  @Column({ name: 'type' })
  type: string;

  @Column({ name: 'status' })
  status: string;

  @Column({ name: 'apr' })
  apr: string;

  @Column({ name: 'apr_type' })
  aprType: string;

  @Column({ name: 'end_block' })
  endBlock: string;

  @Column({ name: 'start_block' })
  startBlock: string;

  @Column({ name: 'total_stake' })
  totalStake: string;

  @Column({ name: 'total_claim' })
  totalClaim: string;

  @Column({ name: 'staking_limit' })
  stakingLimit: string;

  @Column({ name: 'lock_period' })
  lockPeriod: string;

  @Column({ name: 'reward_per_block' })
  rewardPerBlock: string;

  // many to many custom pool and user
  @OneToMany(() => UserPoolEntity, (UIPI) => UIPI.pool)
  userPools: UserPoolEntity[];

  // many to many custom pool and token
  @OneToMany(() => TokenPoolsEntity, (UIPI) => UIPI.pool)
  tokenPools: TokenPoolsEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
