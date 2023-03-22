import { Controller, Body, Get, Param, Post, Put, Query, HttpCode, UseGuards, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PetEntity } from 'src/models/entities/pet.entity';
import { GetCurrentUser } from 'src/shares/decorators/get-current-user.decorators';
import { CurrentUsersDto } from 'src/shares/dtos/current-user.dto';
import { GetPetListRes } from 'src/shares/interface/paging-response.interface';
import { AtGuards } from '../auth/guards';
import { CreatePetDto } from './dto/create-pet.dto';
import { GetPetsDto } from './dto/get-pets.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { PetService } from './pet.service';

@Controller('pet')
@ApiTags('Pet')
export class PetController {
  constructor(private petService: PetService) {}

  @Get()
  @ApiOperation({ summary: 'get all pet.' })
  @ApiOkResponse()
  async findAll(@Query() getPetsDto: GetPetsDto): Promise<GetPetListRes> {
    return this.petService.findAll(getPetsDto);
  }

  @Get('my-pet')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'get my pet.' })
  @UseGuards(AtGuards)
  @ApiOkResponse()
  async findMyPet(@GetCurrentUser() user: CurrentUsersDto, @Query() getPetsDto: GetPetsDto): Promise<GetPetListRes> {
    return this.petService.findAll(getPetsDto, user.userId);
  }

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create new pet.' })
  @UseGuards(AtGuards)
  @ApiCreatedResponse()
  async create(@GetCurrentUser() user: CurrentUsersDto, @Body() createPetDto: CreatePetDto): Promise<PetEntity> {
    return this.petService.create(user.userId, createPetDto);
  }

  @Put(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update pet.' })
  @UseGuards(AtGuards)
  @HttpCode(204)
  async update(
    @GetCurrentUser() user: CurrentUsersDto,
    @Param('id') id: number,
    @Body() updatePetDto: UpdatePetDto,
  ): Promise<PetEntity> {
    return this.petService.update(id, updatePetDto, user.userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get pet by id.' })
  @ApiOkResponse()
  async findOne(@Param('id') id: number): Promise<PetEntity> {
    return this.petService.findById(id);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete pet.' })
  @UseGuards(AtGuards)
  async remove(@GetCurrentUser() user: CurrentUsersDto, @Param('id') id: number): Promise<void> {
    await this.petService.remove(id, user.userId);
  }
}
