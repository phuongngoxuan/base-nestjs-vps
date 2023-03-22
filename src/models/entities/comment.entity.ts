import { Transform } from 'class-transformer';
import { dateTransformer } from 'src/shares/helpers/transformer';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { PostEntity } from './post.entity';
import { UserEntity } from './users.entity';

@Entity({
  name: 'comment',
})
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'post_id' })
  postId: number;

  @Column({ name: 'list_image' }) 
  listImage: string;

  @ManyToOne(() => PostEntity, (post) => post.comments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ referencedColumnName: 'id', name: 'post_id' })
  post: PostEntity;

  @ManyToOne(() => UserEntity, (user) => user.comments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ referencedColumnName: 'id', name: 'user_id' })
  user: UserEntity;

  @CreateDateColumn({ name: 'created_at' })
  @Transform(dateTransformer)
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @Transform(dateTransformer)
  updatedAt: Date;
}
