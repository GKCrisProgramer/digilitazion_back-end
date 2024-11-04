import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CreateDocumentDto {
    @IsString()
    @IsNotEmpty()
    documentName: string;

    @IsString()
    @IsNotEmpty()
    documentLinkRoute: string;

    @IsInt()
    categoryId: number;
    
}