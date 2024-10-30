import { IsString, IsNotEmpty } from 'class-validator';

export class CreateDepartmentDto {
  @IsString()
  @IsNotEmpty()
  departmentName: string;
  
}