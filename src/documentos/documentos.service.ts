import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Documentos } from '../entities/documentos/documentos';
import { CreateDocuementoDto } from './DTO/create-documento.dto';
import * as mammoth from 'mammoth';
import { PDFDocument } from 'pdf-lib';
import * as fs from 'fs/promises';

@Injectable()
export class DocumentosService {
  constructor(
    @InjectRepository(Documentos)
    private documentoRepository: Repository<Documentos>,
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
  async createDocumento(createDocumentoDto: CreateDocuementoDto, wordFilePath?: string): Promise<Documentos> {
    const { Documentos_Nombre, Documentos_RutaLink } = createDocumentoDto;

    // Validar si ya existe el documento
    const existingDocumento = await this.documentoRepository.findOne({ where: { Documentos_Nombre } });
    if (existingDocumento) {
      throw new Error('El documento ya existe');
    }

    // Si se proporciona un archivo Word, convertir a PDF
    if (wordFilePath) {
      const pdfOutputPath = `/path/to/save/${Documentos_Nombre}.pdf`; // Ruta donde se guardará el PDF
      await this.convertWordToPDF(wordFilePath, pdfOutputPath);

      // Actualizar la ruta del PDF en el DTO si se está creando desde un archivo
      createDocumentoDto.Documentos_RutaLink = pdfOutputPath;
    }

    // Crear el documento y guardarlo en la base de datos (con su enlace Documentos_RutaLink)
    const newDocumento = this.documentoRepository.create(createDocumentoDto);
    return this.documentoRepository.save(newDocumento);
  }

  // Obtener todos los documentos
  async findAll(): Promise<Documentos[]> {
    return this.documentoRepository.find(); // Trae todos los documentos
  }

  // Buscar un documento por ID
  async findOne(id: number): Promise<Documentos> {
    const documento = await this.documentoRepository.findOne({ where: { ID_Documentos: id } });
    if (!documento) {
      throw new Error('Documento no encontrado');
    }
    return documento;
  }

  // Eliminar un documento por ID
  async remove(id: number): Promise<void> {
    const result = await this.documentoRepository.delete(id);
    if (result.affected === 0) {
      throw new Error('Documento no encontrado');
    }
  }

  // Actualizar un documento por ID
  async update(id: number, updateDocumentoDto: CreateDocuementoDto, wordFilePath?: string): Promise<Documentos> {
    const documento = await this.documentoRepository.findOne({ where: { ID_Documentos: id } });

    if (!documento) {
      throw new Error('Documento no encontrado');
    }

    // Si se proporciona una nueva ruta de archivo Word, convertir y actualizar el PDF
    if (wordFilePath) {
      const pdfOutputPath = `/path/to/save/${updateDocumentoDto.Documentos_Nombre}.pdf`;
      await this.convertWordToPDF(wordFilePath, pdfOutputPath);
      updateDocumentoDto.Documentos_RutaLink = pdfOutputPath;
    }

    // Actualiza los datos del documento, incluido su enlace Documentos_RutaLink
    Object.assign(documento, updateDocumentoDto);

    return this.documentoRepository.save(documento);
  }
}
