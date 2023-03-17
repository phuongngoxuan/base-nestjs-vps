import { Controller, Body, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PetsEntity } from 'src/models/entities/pets.entity';
import { GetPetListRes } from 'src/shares/interface/paging-response.interface';
import { CreatePetDto } from './dto/create-pet.dto';
import { GetPetsDto } from './dto/get-pets.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { PetService } from './pet.service';

@Controller('pet')
export class PetController {
  constructor(private petService: PetService) {}

  @Get()
  @ApiOperation({ summary: 'get all user.' })
  @ApiResponse({ status: 200, description: 'Get all user.' })
  async findAll(@Query() getPetsDto: GetPetsDto): Promise<GetPetListRes> {
    return this.petService.findAll(getPetsDto);
  }

  @Post()
  @ApiOperation({ summary: 'Create new pet.' })
  @ApiCreatedResponse({ description: 'The user has been successfully created', type: CreatePetDto })
  async create(@Body() createPetDto: CreatePetDto): Promise<PetsEntity> {
    return this.petService.create(createPetDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update pet.' })
  @ApiResponse({ status: 200, description: 'Update a pet.' })
  async update(
    @Param('id') id: number,
    @Body() updatePetDto: UpdatePetDto,
  ): Promise<PetsEntity> {
    return this.petService.update(id, updatePetDto);
  }

  // @ApiResponse({ status: 200, description: 'Get a pet by ID.' })
  // @Get(':id')
  // async findOne(@Param('id') id: string): Promise<Pet> {
  //   return this.petService.findOne(id);
  // }

  // @ApiResponse({ status: 204, description: 'Delete a pet.' })
  // @Delete(':id')
  // async remove(@Param('id') id: string): Promise<void> {
  //   return this.petService.remove(id);
  // }
}
