import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Puesto } from '../puestos/puestos'; // Importa la entidad Puesto

@Entity({ name: 'ca_usuarios' }) // Cambia esto por el nombre de tu tabla de usuarios
export class User {
  @PrimaryGeneratedColumn({})
  ID_Usuarios: number; // Nombre del campo en la base de datos

  @Column({ type: 'varchar', length: 100 })
  Usuarios_User: string; // Nombre del usuario

  @Column({ type: 'varchar', length: 100 })
  Usuarios_Contra: string; // Contraseña encriptada

  // Relación con puestos
  @ManyToOne(() => Puesto, (puesto) => puesto.users)
  puesto: Puesto;
}

