import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from 'src/entities/department/department'; 
import { CreateDepartmentDto } from './DTO/create-department.dto'; 

@Injectable()
export class DepartmentService {
    constructor(
        @InjectRepository(Department)
        private departmentRepository: Repository<Department>,
    ) {}

    // Crear un nuevo departamento
    async createDepartment(departmentData: CreateDepartmentDto): Promise<Department> {
    const {departmentName} = departmentData;

        // Validar si ya existe el departamento
        const existingDepartment = await this.departmentRepository.findOne({ where: { departmentName } });
        if (existingDepartment) {
        throw new BadRequestException('El departamento ya existe');
        }

        // Crear el puesto y guardarlo en la base de datos
        const newDepartment = this.departmentRepository.create(departmentData);
        return this.departmentRepository.save(newDepartment);
    }
    
    // Obtener todos los departamentos
    async findAll(): Promise<Department[]> {
        return this.departmentRepository.find(); // Trae todos los puestos
    }

    // Buscar un departamento por ID
    async findOne(id: number): Promise<Department> {
        const department = await this.departmentRepository.findOne({ where: { departmentId: id } });
        if (!department) {
            throw new NotFoundException('Departamento no encontrado');
        }
        return department;
    }

    // Eliminar un departamento por ID
    async remove(id: number): Promise<void> {
        const result = await this.departmentRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException('Departamento no encontrado');
        }
    }

    // Actualizar un departamento por ID
    async update(id: number, departamentData: Partial<Department>): Promise<Department> {
        const Department = await this.departmentRepository.findOne({ where: { departmentId: id } });
  
        if (!Department) {
            throw new NotFoundException('Departamento no encontrado');
        }

        // Actualiza los datos del departamento
        //Object.assign(Department, departamentoData);
        const updateDepartment = {...Department, ...departamentData}

        return this.departmentRepository.save(Department);
        
    }

}
    