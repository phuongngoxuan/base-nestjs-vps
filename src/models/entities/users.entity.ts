import { DateTime } from 'aws-sdk/clients/devicefarm';
import { Expose, Transform } from 'class-transformer';
import { dateTransformer } from 'src/shares/helpers/transformer';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

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
  japaneseName: string;

  @Column()
  Phone: string;

  @Column()
  Email: string;

  @Column()
  Address: string;

  @Column()
  Birthday: Date;

  @Column()
  GenderID: Date;

  @Column()
  RoleID: Date;

  @Column()
  Status: string;

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
