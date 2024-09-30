import { Controller, Post, Body, Get } from '@nestjs/common';
import { DepartamentoDocumentosService } from './depaxdocu.service';
import { CreateRelacionDto } from './DTO/create-relacion.dto'; // Importa el DTO

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
}
