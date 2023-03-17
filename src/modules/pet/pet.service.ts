import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PetsEntity } from 'src/models/entities/pets.entity';
import { PetVendorsRepository } from 'src/models/repositories/pet-vendors.repository';
import { PetsRepository } from 'src/models/repositories/pets.repository';
import { UserRepository } from 'src/models/repositories/users.repository';
import { GetPetListRes } from 'src/shares/interface/paging-response.interface';
import { CreatePetDto } from './dto/create-pet.dto';
import { GetPetsDto } from './dto/get-pets.dto';
import { UpdatePetDto } from './dto/update-pet.dto';

@Injectable()
export class PetService {
  constructor(
    @InjectRepository(PetsRepository, 'master') private usersRepositoryMaster: PetsRepository,
    @InjectRepository(PetsRepository, 'report') private usersRepositoryReport: PetsRepository,
    @InjectRepository(PetsRepository, 'report') private petVendorsRepositoryReport: PetVendorsRepository,
    @InjectRepository(PetsRepository, 'report') private userRepositoryReport: UserRepository,
  ) {}

  async findAll(getPetsDto: GetPetsDto): Promise<GetPetListRes> {
    return this.usersRepositoryReport.getPets(getPetsDto);
  }

  async create(petDto: CreatePetDto): Promise<PetsEntity> {
    const [petVendor, user] = await Promise.all([
      this.petVendorsRepositoryReport.findOne({ id: petDto.pet_vendor_id }),
      this.userRepositoryReport.findOne({ id: 1 }),
    ]);

    if (!petVendor || user) {
      throw new BadRequestException();
    }

    return this.usersRepositoryMaster.save(petDto);
  }

  async update(id: number, petDto: UpdatePetDto): Promise<PetsEntity> {
    const { pet_owner_id, pet_vendor_id } = petDto;
    const pet = await this.usersRepositoryReport.findOne(id);
    if (pet_owner_id) {
      const owner = await this.usersRepositoryReport.findOne({ id: pet_owner_id });
      if (!owner) {
        throw new BadRequestException(`Pet owner with id ${pet_owner_id} not found`);
      }
    }

    if (pet_vendor_id) {
      const petVendor = await this.petVendorsRepositoryReport.findOne({ id: pet_vendor_id });
      if (!petVendor) throw new BadRequestException(`Pet vendor with id ${pet_vendor_id} not found`);
    }

    if (!pet) {
      throw new BadRequestException(`Pet with id ${id} not found`);
    }

    return this.usersRepositoryMaster.save(petDto);
  }

  //   async findOne(id: number): Promise<PetsEntity> {
  //     const pet = await this.usersRepositoryReport.findOne(id);

  //     if (!pet) {
  //       throw new NotFoundException(`Pet with id ${id} not found`);
  //     }

  //     return pet;
  //   }

  //   async delete(id: number): Promise<void> {
  //     const result = await this.usersRepositoryMaster.delete(id);

  //     if (result.affected === 0) {
  //       throw new NotFoundException(`Pet with id ${id} not found`);
  //     }
  //   }
}
