import { Controller, Post, Body, Get, Delete, Param, ParseIntPipe, Put } from '@nestjs/common';
import { CreateRelationDto } from './DTO/create-relation.dto';
import { AreaDepartmentService } from './areaxdepartment.service';
import { UpdateRelationDto } from './DTO/update-relation.dto';

@Controller('area-department')
export class AreaDepartmentController {
    constructor(private readonly areaDepartmentService: AreaDepartmentService) {}

    @Post()
    async create(@Body() createRelationDto: CreateRelationDto) {
      return this.areaDepartmentService.createRelation(createRelationDto);
    }

    @Get()
    async findAll() {
      return this.areaDepartmentService.findAll();
    }

    // Eliminar una relación por ID
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
      return this.areaDepartmentService.remove(id);
    }

    // Actualizar una relación por ID
    @Put(':id')
    update(
      @Param('id', ParseIntPipe) id: number, 
      @Body() updateRelationDto: UpdateRelationDto
    ) {
      return this.areaDepartmentService.update(id, updateRelationDto);
    }

    //encontrar por area
    @Get(':id/departments')
    async getDepartmentByDepartment(@Param('id') id: number) {
      return this.areaDepartmentService.getDepartmentByArea(id);
    }
}
