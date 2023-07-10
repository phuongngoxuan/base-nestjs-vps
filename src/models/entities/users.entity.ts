import { Expose, Transform } from 'class-transformer';
import { dateTransformer } from 'src/shares/helpers/transformer';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({
  name: 'users',
})
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Expose()
  email: string;

  @Column()
  @Expose()
  address: string;

  @Column()
  @Expose()
  role: string;

  @Column()
  @Expose()
  status: string;

  @CreateDateColumn({ name: 'created_at' })
  @Transform(dateTransformer)
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @Transform(dateTransformer)
  updatedAt: Date;
}
