import { IsString, IsNumber, IsOptional, IsUrl, IsBoolean} from 'class-validator';
export class UpdatePetDto {
    @IsOptional()
    @IsString()
    name?: string;
  
    @IsOptional()
    @IsNumber()
    age?: number;
  
    @IsOptional()
    @IsString()
    species?: string;
  
    @IsOptional()
    @IsString()
    breed?: string;
  
    @IsOptional()
    @IsString()
    description?: string;
  
    @IsOptional()
    @IsUrl()
    image_url?: string;
  
    @IsOptional()
    @IsNumber()
    pet_owner_id?: number;
  
    @IsOptional()
    @IsNumber()
    price?: number;
  
    @IsOptional()
    @IsBoolean()
    is_available?: boolean;
  
    @IsOptional()
    @IsNumber()
    pet_vendor_id?: number;
  }