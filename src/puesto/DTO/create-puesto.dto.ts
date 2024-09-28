import { IsString, IsNotEmpty } from 'class-validator';

export class CreatePuestoDto {
    @IsString()
    @IsNotEmpty()
    Puestos_Nombre: string;
  }