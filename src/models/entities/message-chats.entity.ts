import { Transform } from 'class-transformer';
import { dateTransformer } from 'src/shares/helpers/transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UsersEntity } from './users.entity';

@Entity({
  name: 'message_chats',
})
export class MessageChatEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'sender_id',
  })
  senderId: number;

  @Column({
    name: 'receiver_id',
  })
  receiverId: number;

  @Column()
  message: string;

  @CreateDateColumn({ name: 'created_at' })
  @Transform(dateTransformer)
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @Transform(dateTransformer)
  updatedAt: Date;

  @ManyToOne(() => UsersEntity, (user) => user.message_senders, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ referencedColumnName: 'id', name: 'sender_id' })
  sender: UsersEntity;

  @ManyToOne(() => UsersEntity, (user) => user.message_receivers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ referencedColumnName: 'id', name: 'receiver_id' })
  receiver: UsersEntity;
}
