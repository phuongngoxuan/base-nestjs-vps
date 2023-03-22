import { EntityRepository, Repository } from 'typeorm';
import { ReactionEntity } from '../entities/reaction.entity';
 
@EntityRepository(ReactionEntity)
export class ReactionRepository extends Repository<ReactionEntity> {}
