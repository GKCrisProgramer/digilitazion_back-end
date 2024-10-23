import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { DocumentProfile } from '../docuxprof/docuxprof';
import { DepartmentDocument } from '../depaxdocu/depaxdocu';
import { Category } from '../category/category';

@Entity({ name: 'ca_document' })
export class Document {
    @PrimaryGeneratedColumn({})
    ID_Document: number; // ID del documento

    @Column({ type: 'varchar', length: 255, nullable: false })
    Document_Name: string; // Nombre del documento

    @Column({ type: 'varchar', length: 255, nullable: false })
    Document_LinkRoute: string; // Ruta del documento (Google Drive URL)

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

    @Column({ type: 'int', nullable: true})
    ID_Category: number;  // Mantiene la referencia a la clave foránea
}
