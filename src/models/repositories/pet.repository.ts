import { GetPetsDto } from 'src/modules/pet/dto/get-pets.dto';
import { GetPetListRes } from 'src/shares/interface/paging-response.interface';
import { EntityRepository, Repository } from 'typeorm';
import { PetEntity } from '../entities/pet.entity';

@EntityRepository(PetEntity)
export class PetsRepository extends Repository<PetEntity> {
  async getPets(getPetsDto: GetPetsDto, userId?: number): Promise<GetPetListRes> {
    const { sort, page, limit } = getPetsDto;
    const qb = this.createQueryBuilder('pets');
    if (userId) {
      qb.where('pets.pet_owner_id = :pet_owner_id', { pet_owner_id: userId });
    }
    const skip = (page - 1) * limit;
    const [pets, count] = await qb.skip(skip).take(limit).orderBy('pets.createdAt', sort).getManyAndCount();

    return {
      items: pets,
      meta: {
        currentPage: page,
        itemCount: pets.length,
        itemsPerPage: limit,
        totalItems: count,
        totalPages: Math.ceil(count / limit),
      },
    };
  }
}
