import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/models/repositories/user.repository';
import { CartRepository } from './repositories/cart.repository';
import { CommentRepository } from './repositories/comment.repository';
import { MailRepository } from './repositories/mail.repository';
import { PetsRepository } from './repositories/pet.repository';
import { PostRepository } from './repositories/post.repository';
import { ReactionRepository } from './repositories/reaction.repository';
import { RequestRepository } from './repositories/request.repository';
import { ReviewRepository } from './repositories/review.repository';
import { TransactionRepository } from './repositories/transaction.entity';

const commonRepositories = [
  CartRepository,
  CommentRepository,
  MailRepository,
  PetsRepository,
  PostRepository,
  ReactionRepository,
  RequestRepository,
  ReviewRepository,
  TransactionRepository,
  UserRepository,
];

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature(commonRepositories, 'master'),
    TypeOrmModule.forFeature(commonRepositories, 'report'),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseCommonModule {}
