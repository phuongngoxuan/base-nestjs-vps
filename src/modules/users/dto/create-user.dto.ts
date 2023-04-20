import { IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    required: true,
    example: 'nate json',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    required: true,
    example: 'Ha Noi',
  })
  @IsNotEmpty()
  address: string;

  @IsNotEmpty({ message: 'Email address is required' })
  @IsEmail({}, { message: 'Invalid email address' })
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email address of the user',
    format: 'email',
  })
  email: string;

  @ApiProperty({
    required: true,
    example: '123456789',
  })
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty({
    required: true,
    example: 'https://resq-bucket-2.s3.amazonaws.com/test/1681115579264_c49717abc07d480.jpeg',
  })
  @IsNotEmpty()
  image_url: string;
}
