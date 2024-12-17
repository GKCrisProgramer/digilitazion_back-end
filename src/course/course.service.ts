import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from 'src/entities/course/course';
import { CreateCourseDto } from './DTO/create-course.dto';

@Injectable()
export class CourseService {
    constructor(
        @InjectRepository(Course)
        private courseRepository: Repository<Course>,
    ) {}

    // Crear un nuevo Curso
    async createCourse(courseData: CreateCourseDto): Promise<Course>{
        const {courseName} = courseData;

        //Validr si ya existe el curso
        const existingCourse = await this.courseRepository.findOne({ where: { courseName} });
        if (existingCourse){
            throw new BadRequestException('El Curso ya existe');
        }

        //Crear el curso y guardarlo en la base de datos
        const newCourse = this.courseRepository.create(courseData);
        return this.courseRepository.save(newCourse);
    }

    //Obtener todos los cursos
    async findAll(): Promise<Course[]> {
        return this.courseRepository.find();
    }

    //buscar un curso por ID
    async findOne(id: number): Promise<Course> {
        const course = await this.courseRepository.findOne({ where: { courseId: id} });
        if (!course) {
            throw new NotFoundException('Curso no encontrado');
        }
        return course;
    }

    //Eliminar un curso por ID
    async remove(id: number): Promise<void> {
        const result = await this.courseRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException('Curso no encontrado');
        }
    }

    //Actualizar un curso por ID
    async update(id: number, courseData: Partial<Course>): Promise<Course>{
        const Course = await this.courseRepository.findOne({ where: { courseId: id} });

        if (!Course) {
            throw new NotFoundException('Curso no encontrado');
        }

        //Actualizamos los datos del curso 
        Object.assign(Course, courseData);

        return this.courseRepository.save(Course);
    }

}
