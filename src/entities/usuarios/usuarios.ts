import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Puesto } from '../puestos/puestos'; // Importa la entidad Puesto

@Entity({ name: 'ca_usuarios' }) // Cambia esto por el nombre de tu tabla de usuarios
export class User {
  @PrimaryGeneratedColumn({})
  ID_Usuarios: number; // Nombre del campo en la base de datos

  @Column({ type: 'varchar', length: 100, nullable: false })
  Usuarios_User: string; // Nombre del usuario

  @Column({ type: 'varchar', length: 100, nullable: false })
  Usuarios_Contra: string; // Contraseña encriptada

  // Relación con puestos
  @ManyToOne(() => Puesto, puesto => puesto.users, { nullable: false })
  @JoinColumn({ name: 'ID_Puestos' })
  puesto: Puesto;

  @Column({ type: 'int', nullable: true })
  ID_Puestos: number; // Mantiene la referencia a la clave foránea
}

