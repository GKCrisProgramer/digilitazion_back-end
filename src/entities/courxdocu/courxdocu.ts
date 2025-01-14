import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Course } from "../course/course";
import { Document } from "../document/document";

@Entity({ name: 'de_coursexdocument'})
export class CourseDocument {
    @PrimaryGeneratedColumn()
    ID_CXD:number;

    @ManyToOne(() => Course, course => course.courseDocument)
    @JoinColumn({ name: 'ID_Course'})
    course: Course;

    @ManyToOne(() => Document, document => document.courseDocument)
    @JoinColumn({ name: 'ID_Document'})
    document: Document;
}
