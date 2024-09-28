import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({ name: 'ca_departamento' })
export class Departamento {
  @PrimaryGeneratedColumn({})
  ID_Departamento: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  Departamento_Nombre: string;

  /*@OneToMany(() => User, user => user.puesto)
  users: User[];*/
}
