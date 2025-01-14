import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CourseDocument } from 'src/entities/courxdocu/courxdocu';
import { Course } from 'src/entities/course/course';
import { Document } from 'src/entities/document/document';
import { CreateRelationDto } from './DTO/create-relation.dto';
import { UpdateRelationDto } from './DTO/update-relation.dto';

@Injectable()
export class CourseDocumentService {
    constructor(
        @InjectRepository(CourseDocument)
        private courseDocumentRepository: Repository<CourseDocument>,
        @InjectRepository(Course)
        private courseRepository: Repository<Course>,
        @InjectRepository(Document)
        private documentRepository: Repository<Document>,
    ) {}

    async createRelation(createRelationDto: CreateRelationDto): Promise<CourseDocument>{
        const { courseId, documentId } = createRelationDto;

        //Busca el curso por ID
        const course = await this.courseRepository.findOne({
            where: { courseId},
        });

        if (!course) {
            throw new Error('Curso no encontrado');
        }

        // Busca el documento por ID
        const document = await this.documentRepository.findOne({
            where: { documentId },
        });

        if (!document) {
            throw new Error('Documento no encontrado')
        }

        const newRelation = this.courseDocumentRepository.create({
            course,
            document,
        });

        return this.courseDocumentRepository.save(newRelation);
    }

    //Obtener todas las relaciones
    async findAll(): Promise<CourseDocument[]> { 
        return this.courseDocumentRepository.find({ relations: ['course', 'document'] })
    }

    //funcion para eliminar un relacion
    async remove(id:number): Promise<void> {
        const result = await this.courseDocumentRepository.delete(id);
        if (result.affected === 0){
            throw new Error('Relacion no encontrada');
        }
    }

    async update(id: number, updateRelationDto: UpdateRelationDto): Promise<CourseDocument> {
        const { courseId, documentId } = updateRelationDto;

        const relation = await this.courseDocumentRepository.findOne({
            where: { ID_CXD: id },
            relations: [ 'course', 'document' ],
        });

        if (!relation) {
            throw new Error('Relacion no encontrada');
        }

        // Si se proporciona un ID_cursos, actualizamos el puesto
        if (courseId) {
            const course = await this.courseRepository.findOne({
                where: { courseId },
            });

            if (!course) {
                throw new Error('Curso no encontrado');
            }

            relation.course = course;
        }

        // Si se proporciona un ID_cursos, actualizamos el puesto
        if (documentId) {
            const document = await this.documentRepository.findOne({
                where: { documentId },
            });

            if (!document) {
                throw new Error('Curso no encontrado');
            }

            relation.document = document;
        }

        return this.courseDocumentRepository.save(relation);
    }

    async getDocumentsByCourse(courseId: number): Promise<Document[]> {
        const relations = await this.courseDocumentRepository.find({
            where: { course: { courseId: courseId }},
            relations: ['document']
        });
        return relations.map(rel => rel.document);
    }
}
