import { IsString, IsNotEmpty } from 'class-validator';

export class CreateDocumentDto {
    @IsString()
    @IsNotEmpty()
    documentName: string;

    @IsString()
    @IsNotEmpty()
    documentLinkRoute: string;

    categoryId: number;
    
}