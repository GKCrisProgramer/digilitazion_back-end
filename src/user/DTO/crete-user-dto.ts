import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty( )
  userUser: string;

  @IsString()
  @IsNotEmpty()
  userPass: string;

  @IsInt()
  @IsNotEmpty()
  profileId: number;  // Suponiendo que el puesto se relaciona directamente

}