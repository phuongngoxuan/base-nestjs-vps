import { Transform } from 'class-transformer';
import { dateTransformer } from 'src/shares/helpers/transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RequestEntity } from './request.entity';
import { ReviewEntity } from './review.entity';
import { TransactionEntity } from './transaction.entity';

import { UserEntity } from './users.entity';

@Entity({
  name: 'pet',
})
export class PetEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  species: string;

  @Column()
  color: string;

  @Column()
  breed: string;

  @Column()
  description: string;

  @Column({
    name: 'image_url',
  })
  imageUrl: string;

  @Column({
    name: 'pet_owner_id',
  })
  petOwnerId: number;

  @Column()
  price: string;

  @Column({
    name: 'shop_id',
  })
  shopId: number;

  @Column({
    name: 'dad_pet_id',
  })
  dadPetId: number;

  @Column({
    name: 'mother_pet_id',
  })
  motherPetId: number;

  @Column({
    name: 'list_image',
  })
  listImage: string;

  @Column()
  health: string;

  @Column()
  status: string;

  @Column({ name: 'is_deleted' })
  isDeleted: boolean;

  @Column({ name: 'updated_by' })
  updatedBy: number;

  @CreateDateColumn({ name: 'created_at' })
  @Transform(dateTransformer)
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @Transform(dateTransformer)
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.petOwners, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ referencedColumnName: 'id', name: 'pet_owner_id' })
  petOwner: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.petShops, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ referencedColumnName: 'id', name: 'shop_id' })
  shop: UserEntity;
    
  @OneToOne(() => ReviewEntity, (review) => review.pet)
  reviews: ReviewEntity[];

  @OneToMany(() => RequestEntity, (req) => req.pet)
  petRequests: RequestEntity[];

  @OneToMany(() => TransactionEntity, (transaction) => transaction.pet)
  petTransactions: TransactionEntity[];
}
