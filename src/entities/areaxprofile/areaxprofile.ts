import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Area } from "../area/area";
import { Profile } from "../profile/profile";

@Entity({ name: 'de_areaxprofile' })
export class AreaProfile {
    @PrimaryGeneratedColumn()
    ID_AXP: number;

    @ManyToOne(() => Area, area => area.areaProfile, { onDelete: 'CASCADE', nullable: false })
    @JoinColumn({ name: 'ID_Area' })  // La columna que será la clave foránea
    area: Area;

    @ManyToOne(() => Profile, profile => profile.areaProfile, { onDelete: 'CASCADE', nullable: false })
    @JoinColumn({ name: 'ID_Profile' })  // La columna que será la clave foránea
    profile: Profile;
}
