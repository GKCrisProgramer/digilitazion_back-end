import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { AreaDepartment } from '../areaxdepartment/areaxdepartment';
import { AreaProfile } from '../areaxprofile/areaxprofile';

@Entity({ name: 'ca_area' })
export class Area {
    @PrimaryGeneratedColumn({ name:'ID_Area' })
    areaId: number;

    @Column({ name: 'Area_Name' ,type: 'varchar', length: 100, nullable: false })
    areaName: string;

    @OneToMany(() => AreaDepartment, areaDepartment => areaDepartment.area, {nullable: false})
    areaDepartment: AreaDepartment[];

    @OneToMany(() => AreaProfile, areaProfile => areaProfile.area, {nullable: false})
    areaProfile: AreaProfile[];

}
