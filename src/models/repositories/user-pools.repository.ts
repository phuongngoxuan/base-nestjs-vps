import { EntityRepository, Repository } from 'typeorm';
import { UserPoolEntity } from '../entities/user-pools.entity';

@EntityRepository(UserPoolEntity)
export class UserPoolInfoRepository extends Repository<UserPoolEntity> {}
