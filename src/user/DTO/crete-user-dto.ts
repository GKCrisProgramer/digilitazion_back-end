import { IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  User_User: string;

  @IsString()
  @IsNotEmpty()
  User_Pass: string;

  @IsNotEmpty()
  ID_Profile: number;  // Suponiendo que el puesto se relaciona directamente
}