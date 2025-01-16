import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './DTO/create-course.dto';
import { Course } from 'src/entities/course/course';

@Controller('course')
export class CourseController {
    constructor(private readonly CourseService: CourseService) {}

    // Endpoint para crear un curso
    @Post()
    async create(@Body() CreateCourseDto: CreateCourseDto) {
        return this.CourseService.createCourse(CreateCourseDto);
    }

    // Endpoint para obtener todos los cursos
    @Get()
    findAll(){
        return this.CourseService.findAll();
    }

    // Endpoint para obtener un curso por su ID
    @Get(':id')
    findOne(@Param('id') id:number) {
        return this.CourseService.findOne(id);
    }

    // Endpoint para obtener un curso por su ID
    @Delete(':id')
    remove(@Param('id') id:number) {
        return this.CourseService.remove(id);
    }

    //Endpoint para actualizar un curso por su ID
    @Put(':id')
    update(@Param('id') id: number, @Body() courseData: Partial<Course>) {
        return this.CourseService.update(id, courseData);
    }

}
