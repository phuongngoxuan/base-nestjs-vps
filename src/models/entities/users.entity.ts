import { Expose, Transform } from 'class-transformer';
import { dateTransformer } from 'src/shares/helpers/transformer';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { CommentEntity } from './comment.entity';
import { PetEntity } from './pet.entity';
import { PostEntity } from './post.entity';
import { ReactionEntity } from './reaction.entity';
import { RequestEntity } from './request.entity';
import { ReviewEntity } from './review.entity';
import { TransactionEntity } from './transaction.entity';
 

@Entity({
  name: 'user',
})
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  @Expose()
  address: string;

  @Column()
  @Expose()
  email: string;

  @Column()
  @Expose()
  password: string;

  @Column({name:'card_info'})
  @Expose()
  cardInfo: string;

  @Column()
  @Expose()
  role: string;

  @Column()
  @Expose()
  status: string;

  @Column({name:'is_verify'})
  @Expose()
  isVerify: string;

  @Column( )
  @Expose()
  balance: string;

  @Column({name:'image_url'})
  @Expose()
  imageUrl: string;

  @OneToMany(() => ReviewEntity, (review) => review.user)
  userReviews: ReviewEntity[];

  @OneToMany(() => ReviewEntity, (review) => review.shop)
  shopReviews: ReviewEntity[];

  @OneToMany(() => PetEntity, (pet) => pet.petOwner)
  petOwners: PetEntity[];

  @OneToMany(() => PetEntity, (pet) => pet.shop)
  petShops: PetEntity[];

  @OneToMany(() => RequestEntity, (req) => req.user)
  userRequests: PetEntity[];

  @OneToMany(() => TransactionEntity, (transaction) => transaction.buyer)
  buyerTransactions: TransactionEntity[];

  @OneToMany(() => TransactionEntity, (transaction) => transaction.seller)
  sellerTransactions: TransactionEntity[];

  @OneToMany(() => PostEntity, (post) => post.user)
  posts: PostEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.user)
  comments: CommentEntity[];

  @OneToMany(() => ReactionEntity, (reaction) => reaction.user)
  reactions: ReactionEntity[];

  @CreateDateColumn({ name: 'created_at' })
  @Transform(dateTransformer)
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @Transform(dateTransformer)
  updatedAt: Date;
}
