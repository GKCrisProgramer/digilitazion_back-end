import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AreaService } from './area.service';
import { CreateAreaDto } from './DTO/create-area.dto';
import { Area } from 'src/entities/area/area';

@Controller('area')
export class AreaController {
    constructor(private readonly areaService: AreaService) {}

    @Post()
    async create(@Body() createAreaDto: CreateAreaDto) {
        return this.areaService.createDepartment(createAreaDto);
    }

    @Get()
    findAll() {
        return this.areaService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.areaService.findOne(id);
    }
    
    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.areaService.remove(id);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() areaData: Partial<Area>) {
        return this.areaService.update(id, areaData);
    }
}