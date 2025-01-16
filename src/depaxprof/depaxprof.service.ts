import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DepartmentProfile } from 'src/entities/depaxprof/depaxprof'; 
import { CreateRelationDto } from './DTO/create-relation.dto';
import { UpdateRelationDto } from './DTO/update-relation.dto';
import { Department } from 'src/entities/department/department'; // Asegúrate de importar las entidades correctas
import { Profile } from 'src/entities/profile/profile'; // Asegúrate de importar las entidades correctas

@Injectable()
export class DepartmentProfileService {
  constructor(
    @InjectRepository(DepartmentProfile)
    private departmentProfileRepository: Repository<DepartmentProfile>,
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,  // Inyección del repositorio de Departamento
    @InjectRepository(Profile)
    private puestoRepository: Repository<Profile>,  // Inyección del repositorio de Puesto
  ) {}
  
  async createRelation(createRelacionDto: CreateRelationDto): Promise<DepartmentProfile> {
    const { departmentId, profileId } = createRelacionDto;
  
    // Busca el Departamento por ID
    const department = await this.departmentRepository.findOne({
      where: { departmentId },
    });

    if (!department) {
      throw new Error('Departamento no encontrado');
    }

    // Busca el Puesto por ID
    const profile = await this.puestoRepository.findOne({
      where: { profileId },
    });

    if (!profile) {
      throw new Error('Puesto no encontrado');
    }

    // Crea la nueva relación usando las entidades relacionadas
    const newRelation = this.departmentProfileRepository.create({
      department, // Asignamos la entidad Departamento
      profile,       // Asignamos la entidad Puesto
    });
  
    return this.departmentProfileRepository.save(newRelation);
  }
  
  // Obtener todas las relaciones
  async findAll(): Promise<DepartmentProfile[]> {
    return this.departmentProfileRepository.find({ relations: ['department', 'profile'] });
  }

  //Función para eliminar una relación
  async remove(id: number): Promise<void> {
    const result = await this.departmentProfileRepository.delete(id); // Cambié a `departamentoPuestoRepository`
    if (result.affected === 0) {
      throw new Error('Relación no encontrada');
    }
  }

  //Función para actualizar una relación
  async update(id: number, updateRelationDto: UpdateRelationDto): Promise<DepartmentProfile> {
    const { departmentId, profileId } = updateRelationDto;

    const relation = await this.departmentProfileRepository.findOne({
      where: { ID_DXP: id },
      relations: ['department', 'profile'],
    });

    if (!relation) {
      throw new Error('Relación no encontrada');
    }

    // Si se proporcionó un ID_Departamento, actualizamos el departamento
    if (departmentId) {
      const department = await this.departmentRepository.findOne({
        where: { departmentId },
      });

      if (!department) {
        throw new Error('Departamento no encontrado');
      }

      relation.department = department;
    }

    // Si se proporcionó un ID_Puestos, actualizamos el puesto
    if (profileId) {
      const profile= await this.puestoRepository.findOne({
        where: { profileId },
      });

      if (!profile) {
        throw new Error('Puesto no encontrado');
      }

      relation.profile = profile;
    }

    return this.departmentProfileRepository.save(relation);
  }
  
  // Obtener todos los puestos relacionados a un departamento específico
  async getProfileByDepartment(departmentId: number): Promise<Profile[]> {
    const relations = await this.departmentProfileRepository.find({
      where: { department: { departmentId: departmentId } },
      relations: ['profile'], // Asegúrate de incluir la relación para obtener los puestos
    });
    return relations.map(rel => rel.profile); // Extrae los puestos de las relaciones
  }

}
