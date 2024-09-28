import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Departamento } from '../departamento/departamento';
import { Puesto } from '../puestos/puestos';

@Entity({ name: 'de_depaxpues' })
export class DepartamentoPuesto {
  @PrimaryGeneratedColumn()
  ID_DXP: number;

  @ManyToOne(() => Departamento, departamento => departamento.departamentoPuestos, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'ID_Departamento' })  // La columna que será la clave foránea
  departamento: Departamento;

  @ManyToOne(() => Puesto, puesto => puesto.departamentoPuestos, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'ID_Puestos' })  // La columna que será la clave foránea
  puesto: Puesto;
}

