import { IsEmail, IsString } from "class-validator";

export class CreateUserDto {
  @IsString()
  usuario: string;

  @IsEmail()
  email: string;
}
