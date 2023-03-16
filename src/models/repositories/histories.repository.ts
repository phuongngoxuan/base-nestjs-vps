import { EntityRepository, Repository } from 'typeorm';
import { HistoriesEntity } from '../entities/histories.entity';

@EntityRepository(HistoriesEntity)
export class HistoriesRepository extends Repository<HistoriesEntity> {}
