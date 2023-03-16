import { EntityRepository, Repository } from 'typeorm';
import { TokenPoolsEntity } from '../entities/token-pools.entity';

@EntityRepository(TokenPoolsEntity)
export class TokenPoolsRepository extends Repository<TokenPoolsEntity> {}
