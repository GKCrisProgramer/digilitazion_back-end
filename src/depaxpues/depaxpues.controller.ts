import { Controller, Post, Body, Get } from '@nestjs/common';
import { DepartamentoPuestoService } from './depaxpues.service';
import { CreateRelacionDto } from './DTO/create-relacion.dto'; // Importa el DTO

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
}


/*@Controller('departamento-puesto')
export class DepartamentoPuestoController {
  constructor(
    private readonly departamentoPuestoService: DepartamentoPuestoService,
    private readonly departamentoService: DepartamentoService,
    private readonly puestoService: PuestoService,
  ) {}*/


/*@Post()
  async create(@Body() createRelacionDto: { ID_Departamento: number, ID_Puestos: number }) {
    const departamento = await this.departamentoService.findOne(createRelacionDto.ID_Departamento);
    const puesto = await this.puestoService.findOne(createRelacionDto.ID_Puestos);

    return this.departamentoPuestoService.create(departamento, puesto);
  } */