import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { DocumentosPuesto } from '../docuxpues/docuxpues';

@Entity({ name: 'ca_documentos' }) // Cambia esto por el nombre de tu tabla de usuarios
export class Documentos {
    @PrimaryGeneratedColumn({})
    ID_Documentos: number; // Nombre del campo en la base de datos
  
    @Column({ type: 'varchar', length: 255, nullable: false })
    Documentos_Nombre: string; // Nombre del documento
  
    @Column({ type: 'varchar', length: 255, nullable: false })
    Documentos_RutaLink: string; // Ruta del documento
  
    // Relación con puestos
    @OneToMany(() => DocumentosPuesto, documentosPuestos => documentosPuestos.documento, {nullable: false})
    puestosDocumentos: DocumentosPuesto[];
  }
