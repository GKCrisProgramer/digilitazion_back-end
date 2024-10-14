import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { User } from '../user/user'; // Asegúrate de tener la entidad User
import { DepartmentProfile } from '../depaxprof/depaxprof';
import { DocumentProfile } from '../docuxprof/docuxprof';

@Entity({ name: 'ca_profile' })
export class Profile {
    @PrimaryGeneratedColumn({})
    ID_Profile: number;

    @Column({ type: 'varchar', length: 100, nullable: false })
    Profile_Name: string;

    @OneToMany(() => User, user => user.profile)
    user: User[];

    @OneToMany(() => DepartmentProfile, departmentProfile => departmentProfile.profile, {nullable: false})
    departmentProfile: DepartmentProfile[];

    @OneToMany(() => DocumentProfile, documentProfile => documentProfile.document, {nullable: false})
    documentProfile: DocumentProfile[];
}
