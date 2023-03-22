import { Transform } from 'class-transformer';
import { dateTransformer } from 'src/shares/helpers/transformer';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({
  name: 'cart',
})
export class CartEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'pet_id' })
  petId: number;

  @Column({ name: 'shop_id' })
  shopId: number;

  @Column()
  rating: number;

  @Column()
  comments: string;

  @Column({ name: 'list_image' })
  listImage: string;

  @CreateDateColumn({ name: 'created_at' })
  @Transform(dateTransformer)
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @Transform(dateTransformer)
  updatedAt: Date;
}
