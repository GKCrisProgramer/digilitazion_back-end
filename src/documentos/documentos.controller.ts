import { Controller, Get, Post, Body, Param, Delete, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { DocumentosService } from './documentos.service';
import { CreateDocuementoDto } from './DTO/create-documento.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

@Controller('documentos')
export class DocumentosController {
  constructor(private readonly documentosService: DocumentosService) {}

  // Ruta para crear un nuevo documento (con opción de cargar un archivo Word)
  @Post()
  @UseInterceptors(FileInterceptor('wordFile')) // Intercepta el archivo cargado si se sube
  async createDocumento(
    @Body() createDocumentoDto: CreateDocuementoDto,
    @UploadedFile() wordFile?: Express.Multer.File // Archivo opcional (Word)
  ) {
    let wordFilePath: string | undefined = undefined;

    // Si se ha subido un archivo Word, utiliza la ruta temporal
    if (wordFile) {
      wordFilePath = wordFile.path; // Ruta donde se guardó temporalmente el archivo
    }

    // Llama al servicio para crear el documento (con conversión si aplica)
    return this.documentosService.createDocumento(createDocumentoDto, wordFilePath);
  }

  // Ruta para obtener todos los documentos
  @Get()
  async findAll() {
    return this.documentosService.findAll();
  }

  // Ruta para obtener un documento por su ID
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.documentosService.findOne(+id);
  }

  // Ruta para eliminar un documento por ID
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.documentosService.remove(+id);
  }

  // Ruta para actualizar un documento (con opción de cargar un archivo Word)
  @Put(':id')
  @UseInterceptors(FileInterceptor('wordFile')) // Intercepta el archivo cargado si se sube
  async updateDocumento(
    @Param('id') id: string,
    @Body() updateDocumentoDto: CreateDocuementoDto,
    @UploadedFile() wordFile?: Express.Multer.File // Archivo opcional (Word)
  ) {
    let wordFilePath: string | undefined = undefined;

    // Si se ha subido un archivo Word, utiliza la ruta temporal
    if (wordFile) {
      wordFilePath = wordFile.path;
    }

    // Llama al servicio para actualizar el documento (con conversión si aplica)
    return this.documentosService.update(+id, updateDocumentoDto, wordFilePath);
  }
}
