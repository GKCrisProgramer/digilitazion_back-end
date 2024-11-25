import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Area } from 'src/entities/area/area';
import { CreateAreaDto } from './DTO/create-area.dto';

@Injectable()
export class AreaService {
    constructor(
        @InjectRepository(Area)
        private areaRepository: Repository<Area>,
    ) {}

    // Crear una nueva area
    async createDepartment(areaData: CreateAreaDto): Promise<Area> {
        const {areaName} = areaData;
    
        // Validar si ya existe el departamento
        const existingArea = await this.areaRepository.findOne({ where: { areaName } });
        if (existingArea) {
            throw new BadRequestException('El Area ya existe');
        }

        // Crear el puesto y guardarlo en la base de datos
        const newArea = this.areaRepository.create(areaData);
        return this.areaRepository.save(newArea);
    }

    // Obtener todas las areas
    async findAll(): Promise<Area[]> {
        return this.areaRepository.find(); // Trae todos los puestos
    }

    // Buscar un area por el ID
    async findOne(id: number): Promise<Area> {
        const area = await this.areaRepository.findOne({ where: { areaId: id } });
        if (!area) {
            throw new NotFoundException('Area no encontrado');
        }
        return area;
    }

    // Eliminar un Area por ID
    async remove(id: number): Promise<void> {
        const result = await this.areaRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException('Area no encontrado');
        }
    }

    // Actualizar un Area por ID
    async update(id: number, areaData: Partial<Area>): Promise<Area> {
        const Area = await this.areaRepository.findOne({ where: { areaId: id } });
  
        if (!Area) {
            throw new NotFoundException('Area no encontrado');
        }

        // Actualiza los datos del Area
        Object.assign(Area, areaData);

        return this.areaRepository.save(Area);
        
    }
}
