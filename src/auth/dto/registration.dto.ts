import { IsString, IsEmail, MinLength, MaxLength } from 'class-validator';

export class RegistrationDto {
  @IsString()
  @MaxLength(16)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(16)
  password: string;
}
