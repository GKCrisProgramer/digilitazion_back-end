import { Controller, Post, Body, Get } from '@nestjs/common';
import { CreateRelacionDto } from './DTO/create-relacion.dto';
import { DocumentoPuestoService } from './docuxpues.service';

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
}
