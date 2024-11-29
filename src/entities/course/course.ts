import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { CourseDocument } from '../courxdocu/courxdocu';

@Entity({ name: 'ca_course'})
export class Course {
    @PrimaryGeneratedColumn({ name:'ID_Course'})
    courseId: number; // ID del curso

    @Column({ name:'Course_Name', type: 'varchar', length: 100, nullable: false })
    courseName: string; // Nombre del curso

    //Relacion con los documntos
    @OneToMany(() => CourseDocument, courseDocument => courseDocument.course, {nullable:false})
    courseDocument: CourseDocument[];
}
