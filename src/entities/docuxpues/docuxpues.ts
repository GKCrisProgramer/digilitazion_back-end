import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Puesto } from '../puestos/puestos';
import { Documentos } from '../documentos/documentos'

@Entity({ name: 'de_documentosxpuesto' })
export class DocumentosPuesto {
  @PrimaryGeneratedColumn()
  ID_DXP: number;

  @ManyToOne(() => Puesto, puesto => puesto.documentosPuestos, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'ID_Puestos' })  // La columna que será la clave foránea
  puesto: Puesto;

  @ManyToOne(() => Documentos, documentos => documentos.puestosDocumentos, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'ID_Documentos' })  // La columna que será la clave foránea
  documento: Documentos;
}