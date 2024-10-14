import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Profile } from '../profile/profile'; 

@Entity({ name: 'ca_user' }) // Cambia esto por el nombre de tu tabla de usuarios
export class User {
    @PrimaryGeneratedColumn({})
    ID_User: number; // Nombre del campo en la base de datos

    @Column({ type: 'varchar', length: 100, nullable: false })
    User_User: string; // Nombre del usuario

    @Column({ type: 'varchar', length: 100, nullable: false })
    User_Pass: string; // Contraseña encriptada

    // Relación con puestos
    @ManyToOne(() => Profile, profile => profile.user, { nullable: false })
    @JoinColumn({ name: 'ID_Profile' })
    profile: Profile;

    @Column({ type: 'int', nullable: true })
    ID_Profile: number; // Mantiene la referencia a la clave foránea
}
