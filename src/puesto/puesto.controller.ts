import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { PuestoService } from './puesto.service';
import { Puesto } from '../entities/puestos/puestos';
import { CreatePuestoDto } from '../puesto/DTO/create-puesto.dto'

@Controller('puestos')
export class PuestoController {
  constructor(private readonly puestoService: PuestoService) {}

  // Endpoint para crear un puesto con validacion
  @Post()
  async create(@Body() CreatePuestoDto: CreatePuestoDto) {
    return this.puestoService.createPuesto(CreatePuestoDto);
  }

  // Endpoint para obtener todos los puestos
  @Get()
  findAll() {
    return this.puestoService.findAll();
  }

  // Endpoint para obtener un puesto por su ID
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.puestoService.findOne(id);
  }

  // Endpoint para eliminar un puesto
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.puestoService.remove(id);
  }

  // Endpoint para actualizar un puesto
  @Put(':id')
  update(@Param('id') id: number, @Body() puestoData: Partial<Puesto>) {
    return this.puestoService.update(id, puestoData);
  }
}
