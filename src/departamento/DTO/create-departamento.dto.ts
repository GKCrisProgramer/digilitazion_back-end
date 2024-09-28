import { IsString, IsNotEmpty } from 'class-validator';

export class CreateDepartamentoDto {
    @IsString()
    @IsNotEmpty()
    Departamento_Nombre: string;
  }