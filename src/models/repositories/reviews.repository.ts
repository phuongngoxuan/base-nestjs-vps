import { EntityRepository, Repository } from 'typeorm';
import { ReviewEntity } from '../entities/reviews.entity';

@EntityRepository(ReviewEntity)
export class ReviewRepository extends Repository<ReviewEntity> {}
