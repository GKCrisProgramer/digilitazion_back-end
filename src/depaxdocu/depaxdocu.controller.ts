import { Controller, Post, Body, Get, Delete, Param, ParseIntPipe, Put } from '@nestjs/common';
import { DepartamentoDocumentosService } from './depaxdocu.service';
import { CreateRelacionDto } from './DTO/create-relacion.dto'; // Importa el DTO
import { UpdateRelacionDto } from './DTO/update-relacion.dto';

@Controller('departamento-documento')
export class DepartamentoDocumentosController {
  constructor(private readonly departamentoPuestoService: DepartamentoDocumentosService) {}

  @Post()
  async create(@Body() createRelacionDto: CreateRelacionDto) {
    return this.departamentoPuestoService.createRelacion(createRelacionDto);
  }

  @Get()
  async findAll() {
    return this.departamentoPuestoService.findAll();
  }

  // Eliminar una relación por ID
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.departamentoPuestoService.remove(id);
  }

  // Actualizar una relación por ID
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number, 
    @Body() updateRelacionDto: UpdateRelacionDto
  ) {
    return this.departamentoPuestoService.update(id, updateRelacionDto);
  }
}
