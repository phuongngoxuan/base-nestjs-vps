import { EntityRepository, Repository } from 'typeorm';
import { ProceedPetExchangesEntity } from '../entities/proceed-pet-exchanges';
 
@EntityRepository(ProceedPetExchangesEntity)
export class ProceedPetExchangesRepository extends Repository<ProceedPetExchangesEntity> {}
