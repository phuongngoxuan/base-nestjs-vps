import { Transform } from 'class-transformer';
import { dateTransformer } from 'src/shares/helpers/transformer';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { CommentEntity } from './comment.entity';
import { ReactionEntity } from './reaction.entity';
import { UserEntity } from './users.entity';

@Entity({
  name: 'post',
})
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column({ name: 'comment_count' })
  commentCount: number;

  @Column({ name: 'reaction_count' })
  reactionCount: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'is_deleted' })
  isDeleted: boolean;

  @Column({ name: 'deleted_by' })
  deletedBy: number;

  @ManyToOne(() => UserEntity, (user) => user.posts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ referencedColumnName: 'id', name: 'user_id' })
  user: UserEntity;

  @OneToMany(() => CommentEntity , (comment) => comment.post)
  comments : CommentEntity[];

  @OneToMany(() => ReactionEntity , (reaction) => reaction.post)
  reactions : ReactionEntity[];

  @CreateDateColumn({ name: 'created_at' })
  @Transform(dateTransformer)
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @Transform(dateTransformer)
  updatedAt: Date;
 
}
