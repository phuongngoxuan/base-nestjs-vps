import { EntityRepository, Repository } from 'typeorm';
import { TokensEntity } from '../entities/tokens.entity';
@EntityRepository(TokensEntity)
export class TokenRepository extends Repository<TokensEntity> {}
