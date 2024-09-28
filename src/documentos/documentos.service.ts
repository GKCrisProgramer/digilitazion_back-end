import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Documentos } from '../entities/documentos/documentos'
import { CreateDocuementoDto } from "./DTO/create-documento.dto"

@Injectable()
export class DocumentosService {
    constructor(
        @InjectRepository(Documentos)
        private puestoRepository: Repository<Documentos>,
      ) {}
    
      // Crear un nuevo puesto
      async createDocumento(PuestoData: CreateDocuementoDto): Promise<Documentos> {
        const {Documentos_Nombre, Documentos_RutaLink} = PuestoData;
    
        // Validar si ya existe el documento
        const existingDocumento = await this.puestoRepository.findOne({ where: { Documentos_Nombre } });
        if (existingDocumento) {
        throw new Error('El Puesto ya existe');
        }
    
        // Crear el documento y guardarlo en la base de datos
        const newPuesto = this.puestoRepository.create(PuestoData);
        return this.puestoRepository.save(newPuesto);
      }
    
      // Obtener todos los usuarios
      async findAll(): Promise<Documentos[]> {
        return this.puestoRepository.find(); // Trae todos los puestos
      }
    
      // Buscar un puesto por ID
      async findOne(id: number): Promise<Documentos> {
        const puesto = await this.puestoRepository.findOne({ where: { ID_Documentos: id } });
        if (!puesto) {
          throw new Error('Puesto no encontrado');
        }
        return puesto;
      }
    
      // Eliminar un puesto por ID
      async remove(id: number): Promise<void> {
        const result = await this.puestoRepository.delete(id);
          if (result.affected === 0) {
            throw new Error('Puesto no encontrado');
          }
        }
    
      // Actualizar un puesto por ID
      async update(id: number): Promise<Documentos> {
        const Puesto = await this.puestoRepository.findOne({ where: { ID_Documentos: id } });
      
        if (!Puesto) {
          throw new Error('Puesto no encontrado');
        }
    
        // Actualiza los datos del puesto
        Object.assign(Puesto);
    
        return this.puestoRepository.save(Puesto);
      }
}
