import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { User } from '../usuarios/usuarios'; // Asegúrate de tener la entidad User
import { DepartamentoPuesto } from '../depaxpues/depaxpues';
import { DocumentosPuesto } from '../docuxpues/docuxpues';

@Entity({ name: 'ca_puestos' })
export class Puesto {
  @PrimaryGeneratedColumn({})
  ID_Puestos: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  Puestos_Nombre: string;

  @OneToMany(() => User, user => user.puesto)
  users: User[];

  @OneToMany(() => DepartamentoPuesto, departamentoPuesto => departamentoPuesto.puesto, {nullable: false})
  departamentoPuestos: DepartamentoPuesto[];

  @OneToMany(() => DocumentosPuesto, documentosPuestos => documentosPuestos.documento, {nullable: false})
  documentosPuestos: DepartamentoPuesto[];
}
