import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DocumentosPuesto } from '../entities/docuxpues/docuxpues';
import { CreateRelacionDto } from './DTO/create-relacion.dto';
import { UpdateRelacionDto } from './DTO/update-relacion.dto';
import { Puesto } from '../entities/puestos/puestos';
import { Documentos } from '../entities/documentos/documentos';

@Injectable()
export class DocumentoPuestoService {
  constructor(
    @InjectRepository(DocumentosPuesto)
    private documentosPuestosRepository: Repository<DocumentosPuesto>,
    @InjectRepository(Puesto)
    private puestoRepository: Repository<Puesto>,  // Inyección del repositorio de Puesto
    @InjectRepository(Documentos)
    private documentosRepository: Repository<Documentos>,  // Inyección del repositorio de Departamento
  ) {}
    
  async createRelacion(createRelacionDto: CreateRelacionDto): Promise<DocumentosPuesto> {
    const { ID_Puestos,ID_Documentos } = createRelacionDto;
    
    // Busca el Puesto por ID
    const puesto = await this.puestoRepository.findOne({
      where: { ID_Puestos },
    });
    
    if (!puesto) {
      throw new Error('Puesto no encontrado');
    }

    // Busca el Departamento por ID
    const documento = await this.documentosRepository.findOne({
      where: { ID_Documentos },
    });
      
    if (!documento) {
      throw new Error('documento no encontrado');
    }
    
    // Crea la nueva relación usando las entidades relacionadas
    const nuevaRelacion = this.documentosPuestosRepository.create({
      puesto,       // Asignamos la entidad Puesto
      documento,    // Asignamos la entidad Departamento
    });
    
    return this.documentosPuestosRepository.save(nuevaRelacion);
  }
    
  // Obtener todas las relaciones
  async findAll(): Promise<DocumentosPuesto[]> {
    return this.documentosPuestosRepository.find({ relations: ['puesto', 'documento'] });
  }
      
  //Función para eliminar una relación
  async remove(id: number): Promise<void> {
    const result = await this.documentosPuestosRepository.delete(id); // Cambié a `departamentoPuestoRepository`
    if (result.affected === 0) {
      throw new Error('Relación no encontrada');
    }
  }

  //Función para actualizar una relación
  async update(id: number, updateRelacionDto: UpdateRelacionDto): Promise<DocumentosPuesto> {
    const { ID_Puestos, ID_Documentos } = updateRelacionDto;

    const relacion = await this.documentosPuestosRepository.findOne({
      where: { ID_DXP: id },
      relations: [ 'puesto', 'documento' ],
    });

    if (!relacion) {
      throw new Error('Relación no encontrada');
    }

    // Si se proporcionó un ID_Puestos, actualizamos el puesto
    if (ID_Puestos) {
      const puesto = await this.puestoRepository.findOne({
        where: { ID_Puestos },
      });

      if (!puesto) {
        throw new Error('Puesto no encontrado');
      }

      relacion.puesto = puesto;
    }

    // Si se proporcionó un ID_Documentos, actualizamos el documento
    if (ID_Documentos) {
      const Documentos = await this.documentosRepository.findOne({
        where: { ID_Documentos },
      });

      if (!Documentos) {
        throw new Error('Departamento no encontrado');
      }

      relacion.documento  = Documentos;
    }

    return this.documentosPuestosRepository.save(relacion);
  }

  async findByPuesto(idPuesto: number): Promise<DocumentosPuesto> {
    return this.documentosPuestosRepository.findOne({
      where: { puesto: { ID_Puestos: idPuesto } },
      relations: ['documento'],
    });
  }
}
