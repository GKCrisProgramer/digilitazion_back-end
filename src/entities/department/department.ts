import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { DepartmentProfile } from '../depaxprof/depaxprof';
import { DepartmentDocument } from '../depaxdocu/depaxdocu';
import { AreaDepartment } from '../areaxdepartment/areaxdepartment';

@Entity({ name: 'ca_department' })
export class Department {
    @PrimaryGeneratedColumn({ name:'ID_Department' })
    departmentId: number;

    @Column({ name: 'Department_Name' ,type: 'varchar', length: 100, nullable: false })
    departmentName: string;

    @OneToMany(() => DepartmentProfile, departmentProfile => departmentProfile.department, {nullable: false})
    departmentProfile: DepartmentProfile[];

    @OneToMany(() => DepartmentDocument, departmentDocument => departmentDocument.department, {nullable: false})
    departmentDocument: DepartmentDocument[];

    @OneToMany(() => AreaDepartment, areaDepartment => areaDepartment.department, {nullable: false})
    areaDepartment: DepartmentDocument[];

}
