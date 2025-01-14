import { IsInt, IsNotEmpty } from "class-validator";

export class CreateRelationDto {
    @IsInt()
    @IsNotEmpty()
    courseId: number;

    @IsInt()
    @IsNotEmpty()
    documentId: number;

}