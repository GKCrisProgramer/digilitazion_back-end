import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateRelationDto {
  @IsInt()
  @IsNotEmpty()
  areaId: number;

  @IsInt()
  @IsNotEmpty()
  departmentId: number;
  
}