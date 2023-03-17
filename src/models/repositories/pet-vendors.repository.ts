import { EntityRepository, Repository } from 'typeorm';
import { PetVendorsEntity } from '../entities/pet-vendors.entity';

@EntityRepository(PetVendorsEntity)
export class PetVendorsRepository extends Repository<PetVendorsEntity> {}
