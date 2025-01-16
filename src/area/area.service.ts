import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Area } from 'src/entities/area/area';
import { CreateAreaDto } from './DTO/create-area.dto';

@Injectable()
export class AreaService {
    constructor(
        @InjectRepository(Area)
        private readonly areaRepository: Repository<Area>,
    ) {}

    async createDepartment(areaData: CreateAreaDto): Promise<Area> {
        const { areaName } = areaData;
    
        const existingArea = await this.areaRepository.findOne({ where: { areaName } });
        if (existingArea) {
            throw new BadRequestException('El Area ya existe');
        }

        const newArea = this.areaRepository.create(areaData);
        return this.areaRepository.save(newArea);
    }

    async findAll(): Promise<Area[]> {
        return this.areaRepository.find();
    }

    async findOne(id: number): Promise<Area> {
        const area = await this.areaRepository.findOne({ where: { areaId: id } });
        if (!area) {
            throw new NotFoundException('Area no encontrado');
        }
        return area;
    }

    async remove(id: number): Promise<string> {
        const result = await this.areaRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException('Area no encontrado');
        }
        return 'Area borrada con exito';
    }

    async update(id: number, areaData: Partial<Area>): Promise<Area> {
        const area = await this.areaRepository.findOne({ where: { areaId: id } });
  
        if (!area) {
            throw new NotFoundException('Area no encontrado');
        }

        Object.assign(area, areaData);

        return this.areaRepository.save(area);
    }
}
