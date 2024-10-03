import { Controller, Post, Body, Get, Param, Delete, ParseIntPipe, Put  } from '@nestjs/common';
import { DepartamentoPuestoService } from './depaxpues.service';
import { CreateRelacionDto } from './DTO/create-relacion.dto'; // Importa el DTO
import { UpdateRelacionDto } from './DTO/update-relacion.dto'; // Importa el DTO

@Controller('departamento-puesto')
export class DepartamentoPuestoController {
  constructor(private readonly departamentoPuestoService: DepartamentoPuestoService) {}

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

  // Endpoint para obtener puestos por departamento
  @Get(':id/puestos')
  async getPuestosByDepartamento(@Param('id') id: number) {
    return this.departamentoPuestoService.getPuestosByDepartamento(id);
  }
}