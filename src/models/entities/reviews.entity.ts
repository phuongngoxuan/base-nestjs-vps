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
import { PetVendorsEntity } from './pet-vendors.entity';
import { UsersEntity } from './users.entity';

@Entity({
  name: 'reviews',
})
export class ReviewEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({name:'user_id'})
  userId: number;

  @Column({name:'pet_vendor_id'})
  vendorId: number;

  @Column()
  rating: number;

  @Column()
  comments: string;

  @Column({name:'image_url'})
  imageUrl: string;

  @CreateDateColumn({ name: 'created_at' })
  @Transform(dateTransformer)
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @Transform(dateTransformer)
  updatedAt: Date;

  @ManyToOne(() => UsersEntity, (user) => user.reviews, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ referencedColumnName: 'id', name: 'user_id' })
  user: UsersEntity;

  @ManyToOne(() => PetVendorsEntity, (petVendor) => petVendor.reviews, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ referencedColumnName: 'id', name: 'pet_vendor_id' })
  petVendor: PetVendorsEntity;

}
