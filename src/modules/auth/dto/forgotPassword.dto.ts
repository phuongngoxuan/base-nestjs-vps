import { IsDefined, IsEmail } from 'class-validator';
import { ToLowerCase, Trim } from 'src/shares/decorators/transforms.decorator';

export class ForgotPasswordDto {
  @IsDefined()
  @Trim()
  @ToLowerCase()
  @IsEmail()
  email: string;
}

export default ForgotPasswordDto;
