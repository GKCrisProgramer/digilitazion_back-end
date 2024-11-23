import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { User } from '../user/user'; // Asegúrate de tener la entidad User
import { DepartmentProfile } from '../depaxprof/depaxprof';
import { DocumentProfile } from '../docuxprof/docuxprof';
import { AreaProfile } from '../areaxprofile/areaxprofile';

@Entity({ name: 'ca_profile' })
export class Profile {
    @PrimaryGeneratedColumn({ name:'ID_Profile' })
    profileId: number;

    @Column({  name:'Profile_Name', type: 'varchar', length: 100, nullable: false })
    profileName: string;

    @OneToMany(() => User, user => user.profile)
    user: User[];

    @OneToMany(() => DepartmentProfile, departmentProfile => departmentProfile.profile, {nullable: false})
    departmentProfile: DepartmentProfile[];

    @OneToMany(() => DocumentProfile, documentProfile => documentProfile.profile, {nullable: false})
    documentProfile: DocumentProfile[];

    @OneToMany(() => AreaProfile, areaProfile => areaProfile.profile, {nullable: false})
    areaProfile: AreaProfile[];
    
}
