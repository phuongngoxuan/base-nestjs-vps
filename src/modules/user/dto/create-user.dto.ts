export class CreateUserDto {
  name: string;

  display_name: string;

  address?: string;

  email: string;

  password: string;

  image_url?: string;
}
