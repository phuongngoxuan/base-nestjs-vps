import { EntityRepository, Repository } from 'typeorm';
import { PoolsEntity } from '../entities/pools.entity';
@EntityRepository(PoolsEntity)
export class PoolRepository extends Repository<PoolsEntity> {}
