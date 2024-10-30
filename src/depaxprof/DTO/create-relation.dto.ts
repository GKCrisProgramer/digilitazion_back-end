import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateRelationDto {
  @IsInt()
  @IsNotEmpty()
  departmentId: number;

  @IsInt()
  @IsNotEmpty()
  profileId: number;
  
}