import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { User } from '../usuarios/usuarios'; // Asegúrate de tener la entidad User

@Entity({ name: 'ca_puestos' })
export class Puesto {
  @PrimaryGeneratedColumn({ name: 'ID_Puestos' })
  id: number;

  @Column({ name: 'Puestos_Nombre', type: 'varchar', length: 100 })
  nombre: string;

  @OneToMany(() => User, user => user.puesto)
  users: User[];
}
