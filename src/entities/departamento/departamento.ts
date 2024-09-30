import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { DepartamentoPuesto } from '../depaxpues/depaxpues';
import { DepartamentoDocumentos } from '../depaxdocu/depaxdocu';

@Entity({ name: 'ca_departamento' })
export class Departamento {
  @PrimaryGeneratedColumn({})
  ID_Departamento: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  Departamento_Nombre: string;

  @OneToMany(() => DepartamentoPuesto, departamentoPuesto => departamentoPuesto.departamento, {nullable: false})
  departamentoPuestos: DepartamentoPuesto[]

  @OneToMany(() => DepartamentoDocumentos, documentosDepartamentos => documentosDepartamentos.departamento, {nullable: false})
  documentosDepartamentos: DepartamentoPuesto[];
}
