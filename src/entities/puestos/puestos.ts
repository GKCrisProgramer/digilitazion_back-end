import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { User } from '../usuarios/usuarios'; // Asegúrate de tener la entidad User

@Entity({ name: 'ca_puestos' })
export class Puesto {
  @PrimaryGeneratedColumn({})
  ID_Puestos: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  Puestos_Nombre: string;

  @OneToMany(() => User, user => user.puesto)
  users: User[];
}
