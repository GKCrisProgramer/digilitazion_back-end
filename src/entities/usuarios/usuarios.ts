import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Puesto } from '../puestos/puestos'; // Importa la entidad Puesto

@Entity({ name: 'NombreDeTuTablaUsuarios' }) // Cambia esto por el nombre de tu tabla de usuarios
export class User {
  @PrimaryGeneratedColumn({ name: 'ID_Usuarios' })
  id: number;

  @Column({ name: 'Usuarios_User', type: 'varchar', length: 100 })
  username: string;

  @Column({ name: 'Usuarios_Contra', type: 'varchar', length: 100 })
  password: string;

  @ManyToOne(() => Puesto, puesto => puesto.users)
  @Column({ name: 'ID_Puestos' })
  puesto: Puesto;
}

