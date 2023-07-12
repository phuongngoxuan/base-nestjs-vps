import { EntityRepository, Repository } from 'typeorm';
import { SourceEntity } from '../entities/source.entity';

@EntityRepository(SourceEntity)
export class SourceRepositorySql extends Repository<SourceEntity> {}
