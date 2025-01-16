import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Profile } from '../profile/profile'; 

@Entity({ name: 'ca_user' }) // Cambia esto por el nombre de tu tabla de usuarios
export class User {
    @PrimaryGeneratedColumn({ name:'ID_User' })
    userId: number; // Nombre del campo en la base de datos

    @Column({ name:'User_User', type: 'varchar', length: 100, nullable: false })
    userUser: string; // Nombre del usuario

    @Column({ name:'User_Pass', type: 'varchar', length: 100, nullable: false })
    userPass: string; // Contraseña encriptada

    // Relación con puestos
    @ManyToOne(() => Profile, profile => profile.user, { nullable: false })
    @JoinColumn({ name: 'ID_Profile' })
    profile: Profile;

    @Column({ name: 'ID_Profile', type: 'int', nullable: true })
    profileId: number; // Mantiene la referencia a la clave foránea
    
}
