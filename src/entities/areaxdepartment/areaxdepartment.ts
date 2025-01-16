import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Area } from '../area/area';
import { Department } from '../department/department';

@Entity({ name: 'de_areaxdepa' })
export class AreaDepartment {
    @PrimaryGeneratedColumn()
    ID_AXD: number;

    @ManyToOne(() => Area, area => area.areaDepartment, { onDelete: 'CASCADE', nullable: false })
    @JoinColumn({ name: 'ID_Area' })  // La columna que será la clave foránea
    area: Area;

    @ManyToOne(() => Department, department => department.areaDepartment, { onDelete: 'CASCADE', nullable: false })
    @JoinColumn({ name: 'ID_Department' })  // La columna que será la clave foránea
    department: Department;
    
}

