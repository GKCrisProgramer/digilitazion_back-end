import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Documentos } from '../entities/documentos/documentos';
import { CreateDocuementoDto } from "./DTO/create-documento.dto";

@Injectable()
export class DocumentosService {
  constructor(
    @InjectRepository(Documentos)
    private documentosRepository: Repository<Documentos>,
  ) {}

  // Crear un nuevo documento
  async createDocumento(createDocuementoDto: CreateDocuementoDto): Promise<Documentos> {
    const { Documentos_Nombre, Documentos_RutaLink } = createDocuementoDto;

    // Validar si ya existe el documento
    const existingDocumento = await this.documentosRepository.findOne({ where: { Documentos_Nombre } });
    if (existingDocumento) {
      throw new Error('El documento ya existe');
    }

    // Crear el documento y guardarlo en la base de datos
    const newDocumento = this.documentosRepository.create(createDocuementoDto);
    return this.documentosRepository.save(newDocumento);
  }

  // Obtener todos los documentos
  async findAll(): Promise<Documentos[]> {
    return this.documentosRepository.find(); // Trae todos los documentos
  }

  // Buscar un documento por ID
  async findOne(id: number): Promise<Documentos> {
    const documento = await this.documentosRepository.findOne({ where: { ID_Documentos: id } });
    if (!documento) {
      throw new Error('Documento no encontrado');
    }
    return documento;
  }

  // Eliminar un documento por ID
  async remove(id: number): Promise<void> {
    const result = await this.documentosRepository.delete(id);
    if (result.affected === 0) {
      throw new Error('Documento no encontrado');
    }
  }

  // Actualizar un documento por ID
  async update(id: number, updateData: Partial<Documentos>): Promise<Documentos> {
    const documento = await this.documentosRepository.findOne({ where: { ID_Documentos: id } });
    
    if (!documento) {
      throw new Error('Documento no encontrado');
    }

    // Actualiza los datos del documento
    Object.assign(documento, updateData);

    return this.documentosRepository.save(documento);
  }
}
