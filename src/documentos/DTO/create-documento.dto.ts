import { IsString, IsNotEmpty } from 'class-validator';

export class CreateDocuementoDto {
  @IsString()
  @IsNotEmpty()
  Documentos_Nombre: string;

  @IsString()
  @IsNotEmpty()
  Documentos_RutaLink: string;
}