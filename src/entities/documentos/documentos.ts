import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { DocumentosPuesto } from '../docuxpues/docuxpues';
import { DepartamentoDocumentos } from '../depaxdocu/depaxdocu';

@Entity({ name: 'ca_documentos' })
export class Documentos {
  @PrimaryGeneratedColumn({})
  ID_Documentos: number; // ID del documento

  @Column({ type: 'varchar', length: 255, nullable: false })
  Documentos_Nombre: string; // Nombre del documento

  @Column({ type: 'varchar', length: 255, nullable: false })
  Documentos_RutaLink: string; // Ruta del documento (Google Drive URL)

  // Relación con puestos
  @OneToMany(() => DocumentosPuesto, documentosPuestos => documentosPuestos.documento, {nullable: false})
  puestosDocumentos: DocumentosPuesto[];

  // Relación con departamentos
  @OneToMany(() => DepartamentoDocumentos, documentosDepartamentos => documentosDepartamentos.documento, {nullable: false})
  documentosDepartamentos: DocumentosPuesto[];
}
