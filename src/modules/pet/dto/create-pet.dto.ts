import { IsString, IsInt, IsNumber } from 'class-validator';

export class CreatePetDto {
  @IsString()
  name: string;

  @IsInt()
  age: number;

  @IsString()
  species: string;

  @IsString()
  breed: string;

  @IsString()
  description: string;

  @IsString()
  image_url: string;

  @IsNumber()
  price: number;

  @IsInt()
  pet_vendor_id: number;
}