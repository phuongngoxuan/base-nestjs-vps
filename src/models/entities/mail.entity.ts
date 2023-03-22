import { Transform } from 'class-transformer';
import { dateTransformer } from 'src/shares/helpers/transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';


@Entity({
  name: 'mail',
})
export class MailEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({name:'sender_id'})
  senderId: number;

  @Column({name:'receiver_id'})
  receiverId: number;

  @Column()
  template: string;

  @Column()
  meta: string;

  @Column()
  status: string;

  @CreateDateColumn({ name: 'created_at' })
  @Transform(dateTransformer)
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @Transform(dateTransformer)
  updatedAt: Date;

}
