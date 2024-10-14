import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { DocumentProfile } from '../docuxprof/docuxprof';
import { DepartmentDocument } from '../depaxdocu/depaxdocu';

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
}
