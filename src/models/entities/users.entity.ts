import { Expose } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'tbl_Account',
})
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Expose()
  CustomerCode: string;

  @Column()
  @Expose()
  UserName: string;

  @Column()
  Password: string;

  @Column()
  FullName: string;

  @Column()
  JapaneseName: string;

  @Column()
  Phone: string;

  @Column()
  Email: string;

  @Column()
  Address: string;

  @Column()
  Birthday: Date;

  @Column()
  GenderID: number;

  @Column()
  RoleID: string;

  @Column()
  Status: number;

  @Column()
  Pancake: string;

  @Column()
  FullNameExtra: string;

  @Column()
  PancakeExtra: string;

  @Column()
  CounselorID: number;

  @Column()
  SourceID: number;

  @Column()
  ZIPCode: string;

  @Column()
  Avatar: string;

  @Column()
  AvatarThumbnail: string;

  @Column()
  IsHide: boolean;

  @Column()
  CreatedBy: string;

  @Column()
  CreatedDate: Date;

  @Column()
  UpdatedBy: string;

  @Column()
  UpdatedDate: Date;

  @Column()
  TokenApp: string;

  @Column()
  TokenDeadline: Date;

  @Column()
  PartHalloID: string;

  @Column()
  InCall: boolean;
}
