import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseDocument } from 'src/entities/courxdocu/courxdocu';
import { DepartmentDocument } from 'src/entities/depaxdocu/depaxdocu';
import { DocumentProfile } from 'src/entities/docuxprof/docuxprof';
import { Repository } from 'typeorm';

@Injectable()
export class SeekerService {
    constructor(
        @InjectRepository(DepartmentDocument)
        private departmentDocumentRepository: Repository<DepartmentDocument>,
        @InjectRepository(DocumentProfile)
        private documentProfileRepository: Repository<DocumentProfile>,
        @InjectRepository(CourseDocument)
        private courseDocumentRepository: Repository<CourseDocument>,
    ) {}

    async searchProfilesCoursesAndDepartmentsWithDocuments(query: string): Promise<any[]> {
        if (!query) {
          return [];
        }
      
        const profileResults = await this.documentProfileRepository
        .createQueryBuilder('documentProfile')
        .leftJoinAndSelect('documentProfile.profile', 'profile')
        .leftJoinAndSelect('documentProfile.document', 'document')
        .select([
            'profile.profileId AS id',
            'profile.profileName AS name',
            'document.documentName AS documentName',
            'document.categoryId AS categoryId',
            "'profile' AS type", 
        ])
        .where('document.documentName LIKE :name', { name: `%${query}%` })
        .getRawMany();
    
        const departmentResults = await this.departmentDocumentRepository
        .createQueryBuilder('documentDepartment')
        .leftJoinAndSelect('documentDepartment.department', 'department')
        .leftJoinAndSelect('documentDepartment.document', 'document')
        .select([
            'department.departmentId AS id',
            'department.departmentName AS name',
            'document.documentName AS documentName',
            'document.categoryId AS categoryId',
            "'department' AS type", 
        ])
        .where('document.documentName LIKE :name', { name: `%${query}%` })
        .getRawMany();

        const courseResults = await this.courseDocumentRepository
        .createQueryBuilder('documentCourse')
        .leftJoinAndSelect('documentCourse.course', 'course')
        .leftJoinAndSelect('documentCourse.document', 'document')
        .select([
            'document.documentId AS id',
            'course.courseName AS name',
            'document.documentName AS documentName',
            'document.categoryId AS categoryId',
            "'course' AS type", 
        ])
        .where('document.documentName LIKE :name', { name: `%${query}%` })
        .getRawMany();
      
        return [...profileResults, ...departmentResults, ...courseResults];
    }
}
