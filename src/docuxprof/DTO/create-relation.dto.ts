import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateRelationDto {
  @IsInt()
  @IsNotEmpty()
  profileId: number;

  @IsInt()
  @IsNotEmpty()
  documentId: number;
  
}