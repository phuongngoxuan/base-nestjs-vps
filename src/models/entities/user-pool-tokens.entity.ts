import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { TokensEntity } from './tokens.entity';
import { UserPoolEntity } from './user-pools.entity';

@Entity('user_pool_tokens')
export class UserPoolTokenEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_pool_id' })
  userPoolId: number;

  @Column({ name: 'reward_token_id' })
  rewardTokenId: number;

  @Column({ name: 'stake_token_id' })
  stakeTokenId: number;

  @Column({ name: 'index' })
  index: number;

  @Column({ name: 'total_stake', type: 'decimal', precision: 40, scale: 0 })
  totalStake: string;

  @Column({ name: 'total_claim', type: 'decimal', precision: 40, scale: 0 })
  totalClaim: string;

  // custom many to many user_pool_tokens and user_pools (pending)
  @ManyToOne(() => UserPoolEntity, (userPool) => userPool.userPoolTokens, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ referencedColumnName: 'id', name: 'user_pool_id' })
  userPool: UserPoolEntity;

  // custom many to many user_pool_tokens and stake tokens
  @ManyToOne(() => TokensEntity, (token) => token.stakeTokenUserPools)
  @JoinColumn({ referencedColumnName: 'id', name: 'stake_token_id' })
  stakeToken: TokensEntity;

  // custom many to many user_pool_tokens and reward tokens
  @ManyToOne(() => TokensEntity, (token) => token.rewardTokenUserPools)
  @JoinColumn({ referencedColumnName: 'id', name: 'reward_token_id' })
  rewardToken: TokensEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
