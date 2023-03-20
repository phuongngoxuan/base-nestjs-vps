import { IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    required: true,
    example: 'phuong ngo',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    required: true,
    example: 'Ha Noi',
  })
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email address of the user',
    format: 'email',
  })
  @IsNotEmpty({ message: 'Email address is required' })
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @ApiProperty({
    required: true,
    example: '123456789',
  })
  @IsNotEmpty()
  password: string;
}
