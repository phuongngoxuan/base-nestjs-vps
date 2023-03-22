import { EntityRepository, Repository } from 'typeorm';
import { RequestEntity } from '../entities/request.entity';
 
@EntityRepository(RequestEntity)
export class RequestRepository extends Repository<RequestEntity> {}
