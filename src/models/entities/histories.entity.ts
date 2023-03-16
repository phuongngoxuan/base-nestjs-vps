import { UsersEntity } from './users.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('histories')
export class HistoriesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'from' })
  from: string;

  @Column({ name: 'to' })
  to: string;

  @Column({ name: 'tx_hash' })
  txHash: string;

  @Column({ name: 'block_number' })
  blockNumber: number;

  @Column({ name: 'log_index' })
  logIndex: number;

  @Column({ name: 'action' })
  action: string;

  @Column({ name: 'block_timestamp' })
  blockTimestamp: number;

  @Column({ name: 'pool_id' })
  poolId: number;

  @Column({ name: 'data', type: 'json' })
  data: string;

  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => UsersEntity, (user) => user.history)
  @JoinColumn({ referencedColumnName: 'id', name: 'user_id' })
  user: UsersEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
