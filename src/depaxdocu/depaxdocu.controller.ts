import { Controller, Post, Body, Get, Delete, Param, ParseIntPipe, Put } from '@nestjs/common';
import { DepartamentoDocumentosService } from './depaxdocu.service';
import { CreateRelacionDto } from './DTO/create-relacion.dto'; // Importa el DTO
import { UpdateRelacionDto } from './DTO/update-relacion.dto';

@Controller('departamento-documento')
export class DepartamentoDocumentosController {
  constructor(private readonly departamentoDocumentosService: DepartamentoDocumentosService) {}

  @Post()
  async create(@Body() createRelacionDto: CreateRelacionDto) {
    return this.departamentoDocumentosService.createRelacion(createRelacionDto);
  }

  @Get()
  async findAll() {
    return this.departamentoDocumentosService.findAll();
  }

  // Eliminar una relación por ID
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.departamentoDocumentosService.remove(id);
  }

  // Actualizar una relación por ID
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number, 
    @Body() updateRelacionDto: UpdateRelacionDto
  ) {
    return this.departamentoDocumentosService.update(id, updateRelacionDto);
  }

  // Nueva ruta para obtener todos los departamentos
  @Get('departamentos')
  async getDepartamentos() {
    return this.departamentoDocumentosService.getDepartamentos();
  }

  @Get(':id')
  async getDocumentosPorDepartamento(@Param('id') id: number) {
    return this.departamentoDocumentosService.getDocumentosPorDepartamento(id);
  }
}
