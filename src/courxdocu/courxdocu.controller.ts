import { Controller, Post, Body, Get, Delete, Param, ParseIntPipe, Put } from '@nestjs/common';
import { CreateRelationDto } from './DTO/create-relation.dto';
import { UpdateRelationDto } from './DTO/update-relation.dto';
import { CourseDocumentService } from './courxdocu.service';

@Controller('course-document')
export class CourseDocumentController {
    constructor(private readonly courseDocumentService: CourseDocumentService) {}

    @Post()
    async create(@Body() createRelationDto: CreateRelationDto){
        return this.courseDocumentService.createRelation(createRelationDto);
    }

    @Get()
    async findAll(){
        return this.courseDocumentService.findAll();
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number){
        return this.courseDocumentService.remove(id);
    }

    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateRelationDto: UpdateRelationDto,
    ){
        return this.courseDocumentService.update(id, updateRelationDto);
    }

    @Get(':id/document')
    async getDocumentByCourse(@Param('id') id: number) {
        return this.courseDocumentService.getDocumentsByCourse(id);
    }

}
