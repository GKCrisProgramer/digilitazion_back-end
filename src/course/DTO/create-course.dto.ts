import { IsString, IsNotEmpty } from "class-validator";

export class CreateCourseDto {
    @IsString()
    @IsNotEmpty()
    courseName: string;

}