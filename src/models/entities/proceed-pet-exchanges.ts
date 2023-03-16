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
import { PetsEntity } from './pets.entity';
import { UsersEntity } from './users.entity';

@Entity({
  name: 'proceed_pet_exchanges',
})
export class ProceedPetExchangesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'pet_id',
  })
  petId: number;

  @Column({
    name: 'buyer_id',
  })
  buyerId: number;

  @Column({
    name: 'seller_id',
  })
  sellerId: number;

  @Column({
    name: 'transaction_value',
  })
  transaction_value: string;

  @Column()
  status: string;

  @CreateDateColumn({ name: 'created_at' })
  @Transform(dateTransformer)
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @Transform(dateTransformer)
  updatedAt: Date;

  @ManyToOne(() => PetsEntity, (pet) => pet.proceedPetExchanges, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ referencedColumnName: 'id', name: 'pet_id' })
  pet: PetsEntity;

  @ManyToOne(() => UsersEntity, (user) => user.proceedPetExchangeBuyers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ referencedColumnName: 'id', name: 'buyer_id' })
  buyer: UsersEntity;

  @ManyToOne(() => UsersEntity, (user) => user.proceedPetExchangeSellers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ referencedColumnName: 'id', name: 'seller_id' })
  seller: UsersEntity;
}
