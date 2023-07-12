import { Expose } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'tbl_PartHallo',
})
export class PartHalloEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Expose()
  IsHide: string;

  @Column()
  @Expose()
  CreatedBy: string;

  @Column()
  @Expose()
  UpdatedBy: string;

  @Column()
  PartName: string;
}
