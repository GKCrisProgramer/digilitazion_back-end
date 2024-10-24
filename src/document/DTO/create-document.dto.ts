import { IsString, IsNotEmpty } from 'class-validator';

export class CreateDocumentDto {
    @IsString()
    @IsNotEmpty()
    Document_Name: string;

    @IsString()
    @IsNotEmpty()
    Document_LinkRoute: string;

    categoryId: number;
}