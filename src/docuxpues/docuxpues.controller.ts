import { Controller, Post, Body, Get, Delete, Param, ParseIntPipe, Put } from '@nestjs/common';
import { CreateRelacionDto } from './DTO/create-relacion.dto';
import { DocumentoPuestoService } from './docuxpues.service';
import { UpdateRelacionDto } from './DTO/update-relacion.dto';

@Controller('documento-puesto')
export class DocumentoPuestoController {
    constructor(private readonly departamentoPuestoService: DocumentoPuestoService) {}

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
