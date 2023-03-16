import { EntityRepository, Repository } from 'typeorm';
import { PetsEntity } from '../entities/pets.entity';

@EntityRepository(PetsEntity)
export class PetsRepository extends Repository<PetsEntity> {}
