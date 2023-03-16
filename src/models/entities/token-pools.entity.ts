import { PoolsEntity } from './pools.entity';
import { TokensEntity } from './tokens.entity';

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity('token_pools')
export class TokenPoolsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'pool_id' })
  poolId: number;

  @Column()
  index: number;

  @Column({ name: 'stake_token_id' })
  stakeTokenId: number;

  @Column({ name: 'reward_token_id' })
  rewardTokenId: number;

  @Column({ name: 'total_stake' })
  totalStake: string;

  @Column({ name: 'apr' })
  apr: string;

  @Column()
  rate: string;

  @Column({ name: 'total_claim' })
  totalClaim: string;

  // custom many to many stake token and pool
  @ManyToOne(() => TokensEntity, (user) => user.stakeTokenPools, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ referencedColumnName: 'id', name: 'stake_token_id' })
  stakeToken: TokensEntity;

  // custom many to many reward token and pool
  @ManyToOne(() => TokensEntity, (user) => user.rewardTokenPools, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ referencedColumnName: 'id', name: 'reward_token_id' })
  rewardToken: TokensEntity;

  // custom many to many pool and user
  @ManyToOne(() => PoolsEntity, (pool) => pool.tokenPools)
  @JoinColumn({ referencedColumnName: 'id', name: 'pool_id' })
  pool: PoolsEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
