import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PetEntity } from 'src/models/entities/pet.entity';
import { PetsRepository } from 'src/models/repositories/pet.repository';
import { UserRepository } from 'src/models/repositories/user.repository';
import { httpErrors } from 'src/shares/const/http-errors.const';
import { GetPetListRes } from 'src/shares/interface/paging-response.interface';
import { CreatePetDto } from './dto/create-pet.dto';
import { GetPetsDto } from './dto/get-pets.dto';
import { UpdatePetDto } from './dto/update-pet.dto';

@Injectable()
export class PetService {
  constructor(
    @InjectRepository(PetsRepository, 'master') private petsRepositoryMaster: PetsRepository,
    @InjectRepository(PetsRepository, 'report') private petsRepositoryReport: PetsRepository,
    @InjectRepository(PetsRepository, 'report') private userRepositoryReport: UserRepository,
  ) {}

  async findAll(getPetsDto: GetPetsDto, userId?: number): Promise<GetPetListRes> {
    return this.petsRepositoryMaster.getPets(getPetsDto, userId);
  }

  async create(userId: number, petDto: CreatePetDto): Promise<PetEntity> {
    return this.petsRepositoryMaster.save({ ...petDto, petOwnerId: userId });
  }

  async update(id: number, petDto: UpdatePetDto, userId: number): Promise<PetEntity> {
    const { pet_owner_id } = petDto;
    const pet = await this.petsRepositoryReport.findOne({ id, petOwnerId: userId });
    if (!pet) {
      throw new BadRequestException();
    }
    if (pet_owner_id) {
      const owner = await this.userRepositoryReport.findOne({ id: pet_owner_id });
      if (!owner) {
        throw new BadRequestException(httpErrors.ACCOUNT_NOT_FOUND);
      }
    }

    return this.petsRepositoryMaster.save(petDto);
  }

  async findById(id: number): Promise<PetEntity> {
    const pet = await this.petsRepositoryReport.findOne({ id });
    if (!pet) {
      throw new BadRequestException(httpErrors.PET_NOT_FOUND);
    }

    return pet;
  }

  async remove(petId: number, userId: number): Promise<void> {
    const pet = await this.petsRepositoryReport.findOne({ id: petId });
    if (!pet) {
      throw new BadRequestException(httpErrors.PET_NOT_FOUND);
    }

    await this.petsRepositoryMaster.update({ id: petId, petOwnerId: userId }, { isDeleted: true });
  }
}
