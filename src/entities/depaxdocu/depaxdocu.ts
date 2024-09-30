import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Departamento } from '../departamento/departamento';
import { Documentos } from '../documentos/documentos'

@Entity({ name: 'de_depaxdocumento' })
export class DepartamentoDocumentos {
    @PrimaryGeneratedColumn()
    ID_DXD: number;

    @ManyToOne(() => Departamento, departamento => departamento.documentosDepartamentos, { onDelete: 'CASCADE', nullable: false })
    @JoinColumn({ name: 'ID_Departamento' })  // La columna que será la clave foránea
    departamento: Departamento;

    @ManyToOne(() => Documentos, documentos => documentos.documentosDepartamentos, { onDelete: 'CASCADE', nullable: false })
    @JoinColumn({ name: 'ID_Documentos' })  // La columna que será la clave foránea
    documento: Documentos;
}
