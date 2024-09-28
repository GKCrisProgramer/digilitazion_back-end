import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { Documentos } from '../entities/documentos/documentos'
import { CreateDocuementoDto } from './DTO/create-documento.dto'
import { DocumentosService } from '../documentos/documentos.service'

@Controller('documentos')
export class DocuementosController {
    constructor(private readonly puestoService: DocumentosService) {}
  
    // Endpoint para crear un documentos con validacion
    @Post()
    async create(@Body() CreateDocuementoDto: CreateDocuementoDto) {
      return this.puestoService.createDocumento(CreateDocuementoDto);
    }
  
    // Endpoint para obtener todos los documento
    @Get()
    findAll() {
      return this.puestoService.findAll();
    }
  
    // Endpoint para obtener un documento por su ID
    @Get(':id')
    findOne(@Param('id') id: number) {
      return this.puestoService.findOne(id);
    }
  
    // Endpoint para eliminar un documento
    @Delete(':id')
    remove(@Param('id') id: number) {
      return this.puestoService.remove(id);
    }
  
    // Endpoint para actualizar un documento
    @Put(':id')
    update(@Param('id') id: number, @Body() puestoData: Partial<Documentos>) {
      return this.puestoService.update(id);
    }
  }
  
