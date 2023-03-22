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
import { PetEntity } from './pet.entity';
import { UserEntity } from './users.entity';

@Entity({
  name: 'review',
})
export class ReviewEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({name:'user_id'})
  userId: number;

  @Column({name:'pet_id'})
  petId: number;

  @Column({name:'shop_id'})
  shopId: number;

  @Column()
  rating: number;

  @Column()
  comments: string;

  @Column({name:'list_image'})
  listImage: string;

  @CreateDateColumn({ name: 'created_at' })
  @Transform(dateTransformer)
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @Transform(dateTransformer)
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.userReviews, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ referencedColumnName: 'id', name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.shopReviews, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ referencedColumnName: 'id', name: 'shop_id' })
  shop: UserEntity;

  @ManyToOne(() => PetEntity, (pet) => pet.reviews, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ referencedColumnName: 'id', name: 'pet_id' })
  pet: UserEntity;
}
