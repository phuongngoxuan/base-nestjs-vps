import { Transform } from 'class-transformer';
import { dateTransformer } from 'src/shares/helpers/transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProceedPetExchangesEntity } from './proceed-pet-exchanges';
import { UsersEntity } from './users.entity';

@Entity({
  name: 'pets',
})
export class PetsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  species: string;

  @Column()
  breed: string;

  @Column()
  description: string;

  @Column({
    name: 'image_url',
  })
  imageUrl: string;

  @Column({
    name: 'user_id',
  })
  userId: number;

  @Column({
    name: 'is_available',
  })
  isAvailable: boolean;

  @CreateDateColumn({ name: 'created_at' })
  @Transform(dateTransformer)
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @Transform(dateTransformer)
  updatedAt: Date;

  @ManyToOne(() => UsersEntity, (user) => user.pets, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ referencedColumnName: 'id', name: 'user_id' })
  user: UsersEntity;

  @OneToMany(() => ProceedPetExchangesEntity, (proceedPetExchanges) => proceedPetExchanges.pet)
  proceedPetExchanges: ProceedPetExchangesEntity[];
}
