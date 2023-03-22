import { Transform } from 'class-transformer';
import { dateTransformer } from 'src/shares/helpers/transformer';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { PostEntity } from './post.entity';
import { UserEntity } from './users.entity';

@Entity({
  name: 'reaction',
})
export class ReactionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'post_id' })
  postId: number;

  @ManyToOne(() => UserEntity, (user) => user.reactions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ referencedColumnName: 'id', name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => PostEntity, (post) => post.reactions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ referencedColumnName: 'id', name: 'post_id' })
  post: PostEntity;

  @CreateDateColumn({ name: 'created_at' })
  @Transform(dateTransformer)
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @Transform(dateTransformer)
  updatedAt: Date;
}
