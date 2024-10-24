import { Controller, Post, Body, Get, Param, Delete, ParseIntPipe, Put } from '@nestjs/common';
import { DepartmentProfileService } from './depaxprof.service'; 
import { CreateRelationDto } from './DTO/create-relation.dto';
import { UpdateRelationDto } from './DTO/update-relation.dto';

@Controller('department-profile')
export class DepartmentProfileController {
    constructor(private readonly departmentProfileService: DepartmentProfileService) {}

    @Post()
    async create(@Body() createRelacionDto: CreateRelationDto) {
      return this.departmentProfileService.createRelation(createRelacionDto);
    }

    @Get()
    async findAll() {
      return this.departmentProfileService.findAll();
    }

    // Eliminar una relación por ID
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
      return this.departmentProfileService.remove(id);
    }

    // Actualizar una relación por ID
    @Put(':id')
    update(
      @Param('id', ParseIntPipe) id: number, 
      @Body() updateRelacionDto: UpdateRelationDto
    ) {
      return this.departmentProfileService.update(id, updateRelacionDto);
    }

    // Endpoint para obtener puestos por departamento
    @Get(':id/profile')
    async getProfileByDepartment(@Param('id') id: number) {
      return this.departmentProfileService.getProfileByDepartment(id);
    }
    
}
