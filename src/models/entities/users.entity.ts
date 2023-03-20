import { Expose, Transform } from 'class-transformer';
import { dateTransformer } from 'src/shares/helpers/transformer';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { HistoriesEntity } from './histories.entity';
import { MessageChatEntity } from './message-chats.entity';
import { PetsEntity } from './pets.entity';
import { ProceedPetExchangesEntity } from './proceed-pet-exchanges';
import { ReviewEntity } from './reviews.entity';

@Entity({
  name: 'users',
})
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  @Expose()
  address: string;

  @Column()
  @Expose()
  email: string;

  @Column()
  @Expose()
  password: string;

  @Column()
  @Expose()
  role: string;

  @Column()
  @Expose()
  status: string;

  @OneToMany(() => HistoriesEntity, (history) => history.user)
  history: HistoriesEntity[];

  @OneToMany(() => MessageChatEntity, (message) => message.sender)
  message_senders: MessageChatEntity[];

  @OneToMany(() => MessageChatEntity, (message) => message.receiver)
  message_receivers: MessageChatEntity[];

  @OneToMany(() => PetsEntity, (pet) => pet.petOwner)
  pets: PetsEntity[];

  @OneToMany(() => ProceedPetExchangesEntity, (proceed) => proceed.buyer)
  proceedPetExchangeBuyers: ProceedPetExchangesEntity[];

  @OneToMany(() => ProceedPetExchangesEntity, (proceed) => proceed.seller)
  proceedPetExchangeSellers: ProceedPetExchangesEntity[];

  @OneToMany(() => ReviewEntity, (review) => review.user)
  reviews: ReviewEntity[];

  @CreateDateColumn({ name: 'created_at' })
  @Transform(dateTransformer)
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @Transform(dateTransformer)
  updatedAt: Date;
}
