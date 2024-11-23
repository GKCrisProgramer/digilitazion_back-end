import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AreaProfile } from 'src/entities/areaxprofile/areaxprofile';
import { Area } from 'src/entities/area/area';
import { Profile } from 'src/entities/profile/profile';
import { CreateRelationDto } from './DTO/create-relation.dto';
import { UpdateRelationDto } from './DTO/update-relation.dto';

@Injectable()
export class AreaProfileService {
    constructor(
        @InjectRepository(AreaProfile)
        private areaProfileRepository: Repository<AreaProfile>,
        @InjectRepository(Area)
        private areaRepository: Repository<Area>,  // Inyección del repositorio de Puesto
        @InjectRepository(Profile)
        private profileRepository: Repository<Profile>,  // Inyección del repositorio de Departamento
    ) {}

    async createRelation(createRelationDto: CreateRelationDto): Promise<AreaProfile> {
        const { areaId,profileId } = createRelationDto;
        
        // Busca el area por ID
        const area = await this.areaRepository.findOne({
            where: { areaId },
        });
        
        if (!area) {
            throw new Error('area no encontrado');
        }
    
        // Busca el departamento por ID
        const profile = await this.profileRepository.findOne({
            where: { profileId },
        });
          
        if (!profile) {
            throw new Error('documento no encontrado');
        }
        
        // Crea la nueva relación usando las entidades relacionadas
        const newRelation = this.areaProfileRepository.create({
            area,       // Asignamos la entidad Puesto
            profile,    // Asignamos la entidad Departamento
        });
        
        return this.areaProfileRepository.save(newRelation);
    }

    // Obtener todas las relaciones
    async findAll(): Promise<AreaProfile[]> {
        return this.areaProfileRepository.find({ relations: ['area', 'profile'] });
    }
      
    //Función para eliminar una relación
    async remove(id: number): Promise<void> {
        const result = await this.areaProfileRepository.delete(id); // Cambié a `areaProfileRepository`
        if (result.affected === 0) {
            throw new Error('Relación no encontrada');
        }
    }

    async update(id: number, updateRelationDto: UpdateRelationDto): Promise<AreaProfile> {
        const { areaId, profileId } = updateRelationDto;

        const relation = await this.areaProfileRepository.findOne({
            where: { ID_AXP: id },
            relations: [ 'area', 'profile' ],
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
        if (profileId) {
            const profile = await this.profileRepository.findOne({
                where: { profileId },
            });

            if (!profile) {
                throw new Error('Perfil no encontrado');
            }

            relation.profile  = profile;
        }

        return this.areaProfileRepository.save(relation);
    }

    async getProfileByArea(areaId: number): Promise<Profile[]> {
        const relations = await this.areaProfileRepository.find({
          where: { area: { areaId: areaId } },
          relations: ['profile'], // Asegúrate de incluir la relación para obtener los puestos
        });
        return relations.map(rel => rel.profile); // Extrae los puestos de las relaciones
    }
}
