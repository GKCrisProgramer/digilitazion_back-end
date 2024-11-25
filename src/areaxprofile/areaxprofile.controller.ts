import { Controller, Post, Body, Get, Delete, Param, ParseIntPipe, Put } from '@nestjs/common';
import { CreateRelationDto } from './DTO/create-relation.dto';
import { AreaProfileService } from './areaxprofile.service';
import { UpdateRelationDto } from './DTO/update-relation.dto';

@Controller('area-profile')
export class AreaProfileController {
    constructor(private readonly areaProfileService: AreaProfileService) {}

    @Post()
    async create(@Body() createRelationDto: CreateRelationDto) {
        return this.areaProfileService.createRelation(createRelationDto);
    }

    
    @Get()
    async findAll() {
        return this.areaProfileService.findAll();
    }

    // Eliminar una relación por ID
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.areaProfileService.remove(id);
    }

    // Actualizar una relación por ID
    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number, 
        @Body() updateRelationDto: UpdateRelationDto
    ) {
        return this.areaProfileService.update(id, updateRelationDto);
    }

    //encontrar por area
    @Get(':id/profiles')
    async getProfileByArea(@Param('id') id: number) {
      return this.areaProfileService.getProfileByArea(id);
    }
}
