import { Transform } from 'class-transformer';
import { dateTransformer } from 'src/shares/helpers/transformer';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { PetEntity } from './pet.entity';
import { UserEntity } from './users.entity';
@Entity({
  name: 'request',
})
export class RequestEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'pet_id' })
  petId: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column()
  price: string;

  @Column()
  status: string;

  @Column({ name: 'is_deleted' })
  isDeleted: boolean;

  @Column({ name: 'deleted_by' })
  deletedBy: boolean;

  @CreateDateColumn({ name: 'created_at' })
  @Transform(dateTransformer)
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @Transform(dateTransformer)
  updatedAt: Date;

  @ManyToOne(() => PetEntity, (user) => user.petRequests, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ referencedColumnName: 'id', name: 'pet_id' })
  pet: PetEntity;

  @ManyToOne(() => UserEntity, (user) => user.userRequests, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ referencedColumnName: 'id', name: 'user_id' })
  user: UserEntity;
}
