import { Transform } from 'class-transformer';
import { dateTransformer } from 'src/shares/helpers/transformer';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { PetsEntity } from './pets.entity';
import { ProceedPetExchangesEntity } from './proceed-pet-exchanges';
import { ReviewEntity } from './reviews.entity';

@Entity({
  name: 'pet_vendors',
})
export class PetVendorsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column({ name: 'phone_number' })
  phoneNumber: string;

  @CreateDateColumn({ name: 'created_at' })
  @Transform(dateTransformer)
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @Transform(dateTransformer)
  updatedAt: Date;

  @OneToMany(() => ProceedPetExchangesEntity, (proceedPetExchanges) => proceedPetExchanges.petVendor)
  proceedPetExchanges: ProceedPetExchangesEntity[];

  @OneToMany(() => PetsEntity, (pet) => pet.petVendor)
  pets: PetsEntity[];

  @OneToMany(() => ReviewEntity, (review) => review.petVendor)
  reviews: ReviewEntity[];
}
