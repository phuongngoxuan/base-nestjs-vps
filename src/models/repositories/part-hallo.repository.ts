import { EntityRepository, Repository } from 'typeorm';
import { PartHalloEntity } from '../entities/part-hallo.entity';

@EntityRepository(PartHalloEntity)
export class PartHalloRepositorySql extends Repository<PartHalloEntity> {}
