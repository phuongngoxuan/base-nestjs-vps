import { Expose } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'tbl_Source',
})
export class SourceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Expose()
  Name: string;

  @Column()
  @Expose()
  Language: string;

  @Column()
  IsHide: boolean;

  @Column()
  CreatedBy: string;

  @Column()
  UpdatedBy: string;
}
