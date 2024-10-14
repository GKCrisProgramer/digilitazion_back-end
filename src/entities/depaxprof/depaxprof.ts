import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Department } from '../department/department';
import { Profile } from '../profile/profile';

@Entity({ name: 'de_depaxprof' })
export class DepartmentProfile {
    @PrimaryGeneratedColumn()
    ID_DXP: number;

    @ManyToOne(() => Department, department => department.departmentProfile, { onDelete: 'CASCADE', nullable: false })
    @JoinColumn({ name: 'ID_Department' })  // La columna que será la clave foránea
    department: Department;

    @ManyToOne(() => Profile, profile => profile.departmentProfile, { onDelete: 'CASCADE', nullable: false })
    @JoinColumn({ name: 'ID_Profile' })  // La columna que será la clave foránea
    profile: Profile;
}
