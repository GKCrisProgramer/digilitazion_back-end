import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AreaDepartment } from 'src/entities/areaxdepartment/areaxdepartment';
import { Area } from 'src/entities/area/area';
import { Department } from 'src/entities/department/department';
import { CreateRelationDto } from './DTO/create-relation.dto';
import { UpdateRelationDto } from './DTO/update-relation.dto';

@Injectable()
export class AreaDepartmentService {
    constructor(
        @InjectRepository(AreaDepartment)
        private areaDepartmentRepository: Repository<AreaDepartment>,
        @InjectRepository(Area)
        private areaRepository: Repository<Area>,  // Inyección del repositorio de Puesto
        @InjectRepository(Department)
        private departmentRepository: Repository<Department>,  // Inyección del repositorio de Departamento
    ) {}


    async createRelation(createRelationDto: CreateRelationDto): Promise<AreaDepartment> {
        const { areaId,departmentId } = createRelationDto;
        
        // Busca el area por ID
        const area = await this.areaRepository.findOne({
            where: { areaId },
        });
        
        if (!area) {
            throw new Error('area no encontrado');
        }
    
        // Busca el departamento por ID
        const department = await this.departmentRepository.findOne({
            where: { departmentId },
        });
          
        if (!department) {
            throw new Error('departamento no encontrado');
        }
        
        // Crea la nueva relación usando las entidades relacionadas
        const newRelation = this.areaDepartmentRepository.create({
            area,       // Asignamos la entidad Puesto
            department,    // Asignamos la entidad Departamento
        });
        
        return this.areaDepartmentRepository.save(newRelation);
    }

    // Obtener todas las relaciones
    async findAll(): Promise<AreaDepartment[]> {
        return this.areaDepartmentRepository.find({ relations: ['area', 'department'] });
    }
      
    //Función para eliminar una relación
    async remove(id: number): Promise<void> {
        const result = await this.areaDepartmentRepository.delete(id); // Cambié a `areaDepartmentRepository`
        if (result.affected === 0) {
            throw new Error('Relación no encontrada');
        }
    }

    async update(id: number, updateRelationDto: UpdateRelationDto): Promise<AreaDepartment> {
        const { areaId, departmentId } = updateRelationDto;

        const relation = await this.areaDepartmentRepository.findOne({
            where: { ID_AXD: id },
            relations: [ 'area', 'department' ],
        });

        if (!relation) {
            throw new Error('Relación no encontrada');
        }

        // Si se proporcionó un ID_Puestos, actualizamos el puesto
        if (areaId) {
            const area = await this.areaRepository.findOne({
                where: { areaId },
            });

            if (!area) {
                throw new Error('Area no encontrado');
            }

            relation.area = area;
        }

        // Si se proporcionó un ID_Documentos, actualizamos el documento
        if (departmentId) {
            const department = await this.departmentRepository.findOne({
                where: { departmentId },
            });

            if (!department) {
                throw new Error('Departamento no encontrado');
            }

            relation.department  = department;
        }

        return this.areaDepartmentRepository.save(relation);
    }

    async getDepartmentByArea(areaId: number): Promise<Department[]> {
        const relations = await this.areaDepartmentRepository.find({
          where: { area: { areaId: areaId } },
          relations: ['department'], // Asegúrate de incluir la relación para obtener los puestos
        });
        return relations.map(rel => rel.department); // Extrae los puestos de las relaciones
    }
}
