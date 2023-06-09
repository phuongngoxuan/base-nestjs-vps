import { Expose, Transform } from 'class-transformer';
import { dateTransformer } from 'src/shares/helpers/transformer';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { HistoriesEntity } from './histories.entity';
import { UserPoolEntity } from './user-pools.entity';

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

  @OneToMany(() => HistoriesEntity, (history) => history.user)
  history: HistoriesEntity[];

  // many to many custom user and pool
  @OneToMany(() => UserPoolEntity, (UIPI) => UIPI.user)
  userPool: UserPoolEntity[];

  @CreateDateColumn({ name: 'created_at' })
  @Transform(dateTransformer)
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @Transform(dateTransformer)
  updatedAt: Date;
}
