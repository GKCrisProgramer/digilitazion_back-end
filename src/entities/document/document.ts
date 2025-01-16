import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { DocumentProfile } from '../docuxprof/docuxprof';
import { DepartmentDocument } from '../depaxdocu/depaxdocu';
import { CourseDocument } from '../courxdocu/courxdocu';
import { Category } from '../category/category';

@Entity({ name: 'ca_document' })
export class Document {
    @PrimaryGeneratedColumn({ name:'ID_Document' })
    documentId: number; // ID del documento

    @Column({ name:'Document_Name', type: 'varchar', length: 255, nullable: false })
    documentName: string; // Nombre del documento

    @Column({ name:'Document_LinkRoute', type: 'varchar', length: 255, nullable: false })
    documentLinkRoute: string; // Ruta del documento (Google Drive URL)

    // Relación con puestos
    @OneToMany(() => DocumentProfile, documentProfile => documentProfile.document, {nullable: false})
    documentProfile: DocumentProfile[];

    // Relación con departamentos
    @OneToMany(() => DepartmentDocument, documentDepartment => documentDepartment.document, {nullable: false})
    documentDepartment: DepartmentDocument[];

    // Relacion con categorias
    @ManyToOne(() => Category, category => category.document, { nullable: true })
    @JoinColumn({ name: 'ID_Category' })
    category: Category;

    @Column({ name: 'ID_Category', type: 'int', nullable: true})
    categoryId: number;  // Mantiene la referencia a la clave foránea

    // Relacion con los cursos
    @OneToMany(() => CourseDocument, courseDocument => courseDocument.document)
    courseDocument: CourseDocument[];
    
}
