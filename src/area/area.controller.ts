import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AreaService } from './area.service';
import { CreateAreaDto } from './DTO/create-area.dto';
import { Area } from 'src/entities/area/area';

@Controller('area')
export class AreaController {
    constructor(private readonly AreaService:AreaService) {}

    //Endpoint de la creacion de un area con validacion
    @Post()
    async create (@Body() CreateAreaDto:CreateAreaDto) {
        return this.AreaService.createDepartment(CreateAreaDto);
    }

    //Endpoint de la busqueda de todos las areas 
    @Get()
    findAll() {
        return this.AreaService.findAll();
    }

    @Get(':id')
    findOne(@Param(':id') id:number){
        return this.AreaService.findOne(id)
    }
    
    @Delete(':id')
    remove(@Param(':id') id:number){
        return this.AreaService.remove(id)
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() areaData: Partial<Area>) {
        return this.AreaService.update(id, areaData);
    }
}