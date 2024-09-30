import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DepartamentoDocumentos } from '../entities/depaxdocu/depaxdocu';
import { CreateRelacionDto } from './DTO/create-relacion.dto';
import { Departamento } from '../entities/departamento/departamento'; // Asegúrate de importar las entidades correctas
import { Documentos } from '../entities/documentos/documentos';

@Injectable()
export class DepartamentoDocumentosService {
    constructor(
        @InjectRepository(DepartamentoDocumentos)
        private departamentoDocumentosRepository: Repository<DepartamentoDocumentos>,
        @InjectRepository(Departamento)
        private departamentoRepository: Repository<Departamento>,  // Inyección del repositorio de Departamento
        @InjectRepository(Documentos)
        private documentosRepository: Repository<Documentos>,  // Inyección del repositorio de Departamento
    ) {}

    async createRelacion(createRelacionDto: CreateRelacionDto): Promise<DepartamentoDocumentos> {
        const { ID_Departamento, ID_Documentos } = createRelacionDto;
    
        // Busca el Departamento por ID
        const departamento = await this.departamentoRepository.findOne({
          where: { ID_Departamento },
        });
    
        if (!departamento) {
          throw new Error('Departamento no encontrado');
        }
    
        // Busca el documento por ID
        const documento = await this.documentosRepository.findOne({
          where: { ID_Documentos },
        });
    
        if (!documento) {
          throw new Error('Puesto no encontrado');
        }
    
        // Crea la nueva relación usando las entidades relacionadas
        const nuevaRelacion = this.departamentoDocumentosRepository.create({
          departamento, // Asignamos la entidad Departamento
          documento,       // Asignamos la entidad Puesto
        });
    
        return this.departamentoDocumentosRepository.save(nuevaRelacion);
    }
    
      // Obtener todas las relaciones
    async findAll(): Promise<DepartamentoDocumentos[]> {
        return this.departamentoDocumentosRepository.find({ relations: ['departamento', 'documento'] });
    }
}
