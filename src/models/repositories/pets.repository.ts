import { GetPetsDto } from 'src/modules/pet/dto/get-pets.dto';
import { GetPetListRes } from 'src/shares/interface/paging-response.interface';
import { EntityRepository, Repository } from 'typeorm';
import { PetsEntity } from '../entities/pets.entity';

@EntityRepository(PetsEntity)
export class PetsRepository extends Repository<PetsEntity> {
  async getPets(getPetsDto: GetPetsDto): Promise<GetPetListRes> {
    const { sort, page, limit } = getPetsDto;
    const qb = this.createQueryBuilder('pets');
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
