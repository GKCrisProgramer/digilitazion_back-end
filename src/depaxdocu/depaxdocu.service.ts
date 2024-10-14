import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DepartmentDocument } from '../entities/depaxdocu/depaxdocu';
import { CreateRelationDto } from './DTO/create-relation.dto'; 
import { UpdateRelationDto } from './DTO/update-relation.dto'; 
import { Department } from 'src/entities/department/department';
import { Document } from 'src/entities/document/document';

@Injectable()
export class DepartmentDocumentService {
  constructor(
    @InjectRepository(DepartmentDocument)
    private departmentDocumentRepository: Repository<DepartmentDocument>,
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,  // Inyección del repositorio de Departamento
    @InjectRepository(Document)
    private documentRepository: Repository<Document>,  // Inyección del repositorio de Departamento
  ) {}

  async createRelation(createRelacionDto: CreateRelationDto): Promise<DepartmentDocument> {
    const { ID_Department, ID_Document } = createRelacionDto;
  
    // Busca el Departamento por ID
    const department = await this.departmentRepository.findOne({
      where: { ID_Department },
    });
  
    if (!department) {
      throw new Error('Departamento no encontrado');
    }
  
    // Busca el documento por ID
    const document = await this.documentRepository.findOne({
      where: { ID_Document },
    });
  
    if (!document) {
      throw new Error('documento no encontrado');
    }
  
    // Crea la nueva relación usando las entidades relacionadas
    const nuevaRelacion = this.departmentDocumentRepository.create({
      department,       // Asignamos la entidad Departamento
      document,       // Asignamos la entidad Puesto
    });
  
    return this.departmentDocumentRepository.save(nuevaRelacion);
  }
    
  // Obtener todas las relaciones
  async findAll(): Promise<DepartmentDocument[]> {
    return this.departmentDocumentRepository.find({ relations: ['department', 'document'] });
  }

  //Función para eliminar una relación
  async remove(id: number): Promise<void> {
    const result = await this.departmentDocumentRepository.delete(id); // Cambié a `departmentDocumentRepository`
    if (result.affected === 0) {
      throw new Error('Relación no encontrada');
    }
  }

  //Función para actualizar una relación
  async update(id: number, updateRelacionDto: UpdateRelationDto): Promise<DepartmentDocument> {
    const { ID_Department, ID_Document } = updateRelacionDto;

    const relation = await this.departmentDocumentRepository.findOne({
      where: { ID_DXD: id },
      relations: ['department', 'document'],
    });

    if (!relation) {
      throw new Error('Relación no encontrada');
    }

    // Si se proporcionó un ID_Departamento, actualizamos el departamento
    if (ID_Department) {
      const department = await this.departmentRepository.findOne({
        where: { ID_Department },
      });

      if (!department) {
        throw new Error('Departamento no encontrado');
      }

      relation.department = department;
    }

    // Si se proporcionó un ID_Puestos, actualizamos el puesto
    if (ID_Document) {
      const document = await this.documentRepository.findOne({
        where: { ID_Document },
      });

      if (!document) {
        throw new Error('Documento no encontrado');
      }

      relation.document = document;
    }

    return this.departmentDocumentRepository.save(relation);
  }

  // Nueva función para obtener todos los departamentos
  async getDepartments(): Promise<Department[]> {
    return this.departmentRepository.find(); // Devuelve todos los departamentos
  }

  // Obtener documentos por departamento
  async getDocumentsbyDepartment(idDepartamento: number): Promise<Document[]> {
    const department = await this.departmentRepository.findOne({
      where: { ID_Department: idDepartamento },
    });

    if (!department) {
      throw new Error('Departamento no encontrado');
    }

    // Busca todas las relaciones de ese departamento con documentos
    const relaciones = await this.departmentDocumentRepository.find({
      where: { department },
      relations: ['document'],
    });

    // Extrae solo los documentos de las relaciones
    const documents = relaciones.map(relacion => relacion.document);

    return documents;
  }
}
