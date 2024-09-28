import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { DepartamentoService } from './departamento.service'
import { CreateDepartamentoDto } from './DTO/create-departamento.dto'
import { Departamento } from '../entities/departamento/departamento'

@Controller('departamento')
export class DepartamentoController {
  constructor(private readonly DepartamentoService: DepartamentoService) {}

  // Endpoint para crear un departamento con validacion
  @Post()
  async create(@Body() CreateDepartamentoDto: CreateDepartamentoDto) {
    return this.DepartamentoService.createPuesto(CreateDepartamentoDto);
  }

  // Endpoint para obtener todos los departamentos
  @Get()
  findAll() {
    return this.DepartamentoService.findAll();
  }

  // Endpoint para obtener un departamento por su ID
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.DepartamentoService.findOne(id);
  }

  // Endpoint para eliminar un departamento
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.DepartamentoService.remove(id);
  }

  // Endpoint para actualizar un departamento
  @Put(':id')
  update(@Param('id') id: number, @Body() puestoData: Partial<Departamento>) {
    return this.DepartamentoService.update(id);
  }
}
