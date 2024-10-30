import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Department } from '../department/department';
import { Document } from '../document/document';

@Entity({ name: 'de_depaxdocument' })
export class DepartmentDocument {
    @PrimaryGeneratedColumn()
    ID_DXD: number;

    @ManyToOne(() => Department, department => department.departmentDocument, { onDelete: 'CASCADE', nullable: false })
    @JoinColumn({ name: 'ID_Department' })  // La columna que será la clave foránea
    department: Department;

    @ManyToOne(() => Document, document => document.documentDepartment, { onDelete: 'CASCADE', nullable: false })
    @JoinColumn({ name: 'ID_Document' })  // La columna que será la clave foránea
    document: Document;
    
}