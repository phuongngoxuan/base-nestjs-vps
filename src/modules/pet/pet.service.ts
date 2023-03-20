import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PetsEntity } from 'src/models/entities/pets.entity';
import { PetVendorsRepository } from 'src/models/repositories/pet-vendors.repository';
import { PetsRepository } from 'src/models/repositories/pets.repository';
import { UserRepository } from 'src/models/repositories/users.repository';
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
    @InjectRepository(PetsRepository, 'report') private petVendorsRepositoryReport: PetVendorsRepository,
  ) {}

  async findAll(getPetsDto: GetPetsDto): Promise<GetPetListRes> {
    return this.petsRepositoryMaster.getPets(getPetsDto);
  }

  async create(userId: number, petDto: CreatePetDto): Promise<PetsEntity> {
    const petVendor = await this.petVendorsRepositoryReport.findOne({ id: petDto.pet_vendor_id });
    if (!petVendor) {
      throw new BadRequestException(httpErrors.PET_VENDOR_NOT_FOUND);
    }

    return this.petsRepositoryMaster.save({ ...petDto, petOwnerId: userId });
  }

  async update(id: number, petDto: UpdatePetDto, userId: number): Promise<PetsEntity> {
    const { pet_owner_id, pet_vendor_id } = petDto;
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
    if (pet_vendor_id) {
      const petVendor = await this.petVendorsRepositoryReport.findOne({ id: pet_vendor_id });
      if (!petVendor) throw new BadRequestException(httpErrors.PET_VENDOR_NOT_FOUND);
    }

    return this.petsRepositoryMaster.save(petDto);
  }

  async findById(id: number): Promise<PetsEntity> {
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

    await this.petsRepositoryMaster.delete({ id: petId, petOwnerId: userId });
  }
}
