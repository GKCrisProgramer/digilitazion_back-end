import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateRelacionDto {
  @IsInt()
  @IsNotEmpty()
  ID_Puestos: number;

  @IsInt()
  @IsNotEmpty()
  ID_Documentos: number;
}