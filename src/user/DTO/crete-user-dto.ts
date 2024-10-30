import { IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty( )
  userUser: string;

  @IsString()
  @IsNotEmpty()
  userPass: string;

  @IsNotEmpty()
  profileId: number;  // Suponiendo que el puesto se relaciona directamente

}