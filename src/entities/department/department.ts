import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { DepartmentProfile } from '../depaxprof/depaxprof';
import { DepartmentDocument } from '../depaxdocu/depaxdocu';

@Entity({ name: 'ca_department' })
export class Department {
    @PrimaryGeneratedColumn({})
    ID_Department: number;

    @Column({ type: 'varchar', length: 100, nullable: false })
    Department_Name: string;

    @OneToMany(() => DepartmentProfile, departmentProfile => departmentProfile.department, {nullable: false})
    departmentProfile: DepartmentProfile[]

    @OneToMany(() => DepartmentDocument, departmentDocument => departmentDocument.department, {nullable: false})
    departmentDocument: DepartmentDocument[];
}
