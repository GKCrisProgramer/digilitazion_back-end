import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { PuestoService } from './puesto.service';
import { Puesto } from '../entities/puestos/puestos';

@Controller('puestos')
export class PuestoController {
  constructor(private readonly puestoService: PuestoService) {}

  // Endpoint para crear un puesto
  @Post()
  async create(@Body('nombre') nombre: string): Promise<Puesto> {
    return this.puestoService.create(nombre);
  }

  // Endpoint para obtener todos los puestos
  @Get()
  async findAll(): Promise<Puesto[]> {
    return this.puestoService.findAll();
  }

  // Endpoint para obtener un puesto por su ID
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Puesto> {
    return this.puestoService.findOne(id);
  }

  // Endpoint para actualizar un puesto
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body('nombre') nombre: string,
  ): Promise<Puesto> {
    return this.puestoService.update(id, nombre);
  }

  // Endpoint para eliminar un puesto
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.puestoService.remove(id);
  }
}
