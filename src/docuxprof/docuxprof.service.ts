import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DocumentProfile } from 'src/entities/docuxprof/docuxprof'; 
import { CreateRelationDto } from './DTO/create-relation.dto'; 
import { UpdateRelationDto } from './DTO/update-relation.dto'; 
import { Profile } from 'src/entities/profile/profile'; 
import { Document } from 'src/entities/document/document'; 

@Injectable()
export class DocumentProfileService {
    constructor(
        @InjectRepository(DocumentProfile)
        private documentProfileRepository: Repository<DocumentProfile>,
        @InjectRepository(Profile)
        private profileRepository: Repository<Profile>,  // Inyección del repositorio de Puesto
        @InjectRepository(Document)
        private documentRepository: Repository<Document>,  // Inyección del repositorio de Departamento
    ) {}

    async createRelation(createRelationDto: CreateRelationDto): Promise<DocumentProfile> {
        const { profileId,documentId } = createRelationDto;
        
        // Busca el Puesto por ID
        const profile = await this.profileRepository.findOne({
            where: { profileId },
        });
        
        if (!profile) {
            throw new Error('Puesto no encontrado');
        }
    
        // Busca el Departamento por ID
        const document = await this.documentRepository.findOne({
            where: { documentId },
        });
          
        if (!document) {
            throw new Error('documento no encontrado');
        }
        
        // Crea la nueva relación usando las entidades relacionadas
        const newRelation = this.documentProfileRepository.create({
            profile,       // Asignamos la entidad Puesto
            document,    // Asignamos la entidad Departamento
        });
        
        return this.documentProfileRepository.save(newRelation);
    }

    // Obtener todas las relaciones
    async findAll(): Promise<DocumentProfile[]> {
        return this.documentProfileRepository.find({ relations: ['profile', 'document'] });
    }
      
    //Función para eliminar una relación
    async remove(id: number): Promise<void> {
        const result = await this.documentProfileRepository.delete(id); // Cambié a `departamentoPuestoRepository`
        if (result.affected === 0) {
            throw new Error('Relación no encontrada');
        }
    }

    //Función para actualizar una relación
    async update(id: number, updateRelationDto: UpdateRelationDto): Promise<DocumentProfile> {
        const { profileId, documentId } = updateRelationDto;

        const relation = await this.documentProfileRepository.findOne({
            where: { ID_DXP: id },
            relations: [ 'profile', 'document' ],
        });

        if (!relation) {
            throw new Error('Relación no encontrada');
        }

        // Si se proporcionó un ID_Puestos, actualizamos el puesto
        if (profileId) {
            const profile = await this.profileRepository.findOne({
                where: { profileId },
            });

            if (!profile) {
                throw new Error('Puesto no encontrado');
            }

            relation.profile = profile;
        }

        // Si se proporcionó un ID_Documentos, actualizamos el documento
        if (documentId) {
            const document = await this.documentRepository.findOne({
                where: { documentId },
            });

            if (!document) {
                throw new Error('Departamento no encontrado');
            }

            relation.document  = document;
        }

        return this.documentProfileRepository.save(relation);
    }

    async findByProfile(profileId: number): Promise<DocumentProfile> {
        return this.documentProfileRepository.findOne({
          where: { profile: { profileId: profileId } },
          relations: ['document'],
        });
    }
    
}
