import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from 'src/entities/document/document';
import { CreateDocumentDto } from './DTO/create-document.dto'; 
import * as mammoth from 'mammoth';
import { PDFDocument } from 'pdf-lib';
import * as fs from 'fs/promises';

@Injectable()
export class DocumentService {
    constructor(
        @InjectRepository(Document)
        private documentRepository: Repository<Document>,
    ) {}

    // Función para convertir Word a PDF
    async convertWordToPDF(wordFilePath: string, pdfOutputPath: string): Promise<void> {
        try {
            // Leer y convertir el archivo de Word a HTML
            const { value: wordToHtml } = await mammoth.convertToHtml({ path: wordFilePath });
      
            // Crear un nuevo PDF
            const pdfDoc = await PDFDocument.create();
            const page = pdfDoc.addPage([600, 800]);

            // Añadir el HTML convertido al PDF
            page.drawText(wordToHtml, { x: 50, y: 750, size: 12 });

            // Guardar el PDF
            const pdfBytes = await pdfDoc.save();
            await fs.writeFile(pdfOutputPath, pdfBytes);
        } catch (error) {
            console.error('Error convirtiendo el archivo de Word a PDF:', error);
            throw new Error('Error al convertir el archivo de Word a PDF.');
        }
    }

    // Crear un nuevo documento
    async createDocument(createDocumentoDto: CreateDocumentDto, wordFilePath?: string): Promise<Document> {
        const { Document_Name, Document_LinkRoute } = createDocumentoDto;

        // Validar si ya existe el documento
        const existingDocument = await this.documentRepository.findOne({ where: { Document_Name } });
        if (existingDocument) {
            throw new Error('El documento ya existe');
        }  

        // Si se proporciona un archivo Word, convertir a PDF
        if (wordFilePath) {
            const pdfOutputPath = `/path/to/save/${Document_Name}.pdf`; // Ruta donde se guardará el PDF
            await this.convertWordToPDF(wordFilePath, pdfOutputPath);

            // Actualizar la ruta del PDF en el DTO si se está creando desde un archivo
            createDocumentoDto.Document_LinkRoute = pdfOutputPath;
        }

        // Crear el documento y guardarlo en la base de datos (con su enlace Documentos_RutaLink)
        const newDocument = this.documentRepository.create(createDocumentoDto);
        return this.documentRepository.save(newDocument);
    }
    
    // Obtener todos los documentos
    async findAll(): Promise<Document[]> {
        return this.documentRepository.find(); // Trae todos los documentos
    }

    // Buscar un documento por ID
    async findOne(id: number): Promise<Document> {
        const document = await this.documentRepository.findOne({ where: { ID_Document: id } });
        if (!document) {
            throw new Error('Documento no encontrado');
        }
        return document;
    }

    // Eliminar un documento por ID
    async remove(id: number): Promise<void> {
        const result = await this.documentRepository.delete(id);
        if (result.affected === 0) {
            throw new Error('Documento no encontrado');
        }
    }

    // Actualizar un documento por ID
    async update(id: number, updateDocumentoDto: CreateDocumentDto, wordFilePath?: string): Promise<Document> {
        const document = await this.documentRepository.findOne({ where: { ID_Document: id } });

        if (!document) {
            throw new Error('Documento no encontrado');
        }

        // Si se proporciona una nueva ruta de archivo Word, convertir y actualizar el PDF
        if (wordFilePath) {
            const pdfOutputPath = `/path/to/save/${updateDocumentoDto.Document_Name}.pdf`;
            await this.convertWordToPDF(wordFilePath, pdfOutputPath);
            updateDocumentoDto.Document_LinkRoute = pdfOutputPath;
        }

        // Actualiza los datos del documento, incluido su enlace Documentos_RutaLink
        Object.assign(document, updateDocumentoDto);

        return this.documentRepository.save(document);
    }
}
