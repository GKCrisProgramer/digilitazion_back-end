import { IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  Usuarios_User: string;

  @IsString()
  @IsNotEmpty()
  Usuarios_Contra: string;

  @IsNotEmpty()
  ID_Puestos: number;  // Suponiendo que el puesto se relaciona directamente
}
