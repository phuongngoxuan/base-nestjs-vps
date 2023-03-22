import { Transform } from 'class-transformer';
import { dateTransformer } from 'src/shares/helpers/transformer';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { PetEntity } from './pet.entity';
import { UserEntity } from './users.entity';

@Entity({
  name: 'transaction',
})
export class TransactionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'pet_id' })
  petId: number;

  @Column({ name: 'buyer_id' })
  buyerId: number;

  @Column({ name: 'seller_id' })
  sellerId: number;

  @Column()
  price: string;

  @Column()
  status: string;

  @ManyToOne(() => PetEntity, (user) => user.petTransactions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ referencedColumnName: 'id', name: 'pet_id' })
  pet: PetEntity;

  @ManyToOne(() => UserEntity, (user) => user.buyerTransactions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ referencedColumnName: 'id', name: 'buyer_id' })
  buyer: UserEntity;

  @ManyToOne(() => UserEntity, (pet) => pet.sellerTransactions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ referencedColumnName: 'id', name: 'seller_id' })
  seller: UserEntity;


  @CreateDateColumn({ name: 'created_at' })
  @Transform(dateTransformer)
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @Transform(dateTransformer)
  updatedAt: Date;
}
