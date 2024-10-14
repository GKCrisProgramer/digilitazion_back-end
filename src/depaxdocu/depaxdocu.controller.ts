import { Controller, Post, Body, Get, Delete, Param, ParseIntPipe, Put } from '@nestjs/common';
import { DepartmentDocumentService } from './depaxdocu.service';
import { CreateRelationDto } from './DTO/create-relation.dto';  // Importa el DTO
import { UpdateRelationDto } from './DTO/update-relation.dto';

@Controller('department-document')
export class DepartmentDocumentController {
  constructor(private readonly departmentDocumentService: DepartmentDocumentService) {}

  @Post()
  async create(@Body() createRelationDto: CreateRelationDto) {
    return this.departmentDocumentService.createRelation(createRelationDto);
  }

  @Get()
  async findAll() {
    return this.departmentDocumentService.findAll();
  }

  // Eliminar una relación por ID
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.departmentDocumentService.remove(id);
  }

  // Actualizar una relación por ID
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number, 
    @Body() updateRelationDto: UpdateRelationDto
  ) {
    return this.departmentDocumentService.update(id, updateRelationDto);
  }

  // Nueva ruta para obtener todos los departamentos
  @Get('department')
  async getDepartments() {
    return this.departmentDocumentService.getDepartments();
  }

  @Get(':id')
  async getDocumentsbyDepartment(@Param('id') id: number) {
    return this.departmentDocumentService.getDocumentsbyDepartment(id);
  }
}
