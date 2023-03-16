import { UsersEntity } from './users.entity';
import { PoolsEntity } from './pools.entity';
import { UserPoolTokenEntity } from './user-pool-tokens.entity';

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity('user_pools')
export class UserPoolEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'pool_id' })
  poolId: number;

  @Column({ name: 'start_stake' })
  startStake: number;

  @Column({ name: 'total_stake' })
  totalStake: string;

  @Column({ name: 'total_claim' })
  totalClaim: string;

  // custom many to many user and pool
  @ManyToOne(() => UsersEntity, (user) => user.userPool, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ referencedColumnName: 'id', name: 'user_id' })
  user: UsersEntity;

  // custom many to many pool and user
  @ManyToOne(() => PoolsEntity, (pool) => pool.userPools)
  @JoinColumn({ referencedColumnName: 'id', name: 'pool_id' })
  pool: PoolsEntity;

  // custom many to many user_pool and user_pool_tokens
  @OneToMany(() => UserPoolTokenEntity, (userPoolToken) => userPoolToken.userPool)
  userPoolTokens: UserPoolTokenEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
