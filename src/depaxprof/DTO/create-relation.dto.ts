import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateRelationDto {
  @IsInt()
  @IsNotEmpty()
  ID_Department: number;

  @IsInt()
  @IsNotEmpty()
  ID_Profile: number;
}