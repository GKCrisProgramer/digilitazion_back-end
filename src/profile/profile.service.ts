import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from 'src/entities/profile/profile'; 
import { CreateProfileDto } from './DTO/create-profile.dto';

@Injectable()
export class ProfileService {
    constructor(
        @InjectRepository(Profile)
        private profileRepository: Repository<Profile>,
    ) {}

    // Crear un nuevo puesto
    async createProfile(ProfileData: CreateProfileDto): Promise<Profile> {
        const {Profile_Name} = ProfileData;

        // Validar si ya existe el puesto
        const existingProfile = await this.profileRepository.findOne({ where: { Profile_Name } });
        if (existingProfile) {
            throw new Error('El Puesto ya existe');
        }

        // Crear el puesto y guardarlo en la base de datos
        const newProfile = this.profileRepository.create(ProfileData);
        return this.profileRepository.save(newProfile);
    }

    // Obtener todos los usuarios
    async findAll(): Promise<Profile[]> {
        return this.profileRepository.find(); // Trae todos los puestos
    }

    // Buscar un puesto por ID
    async findOne(id: number): Promise<Profile> {
        const profile = await this.profileRepository.findOne({ where: { ID_Profile: id } });
        if (!profile) {
            throw new Error('Puesto no encontrado');
        }
        return profile;
    }

    // Eliminar un puesto por ID
    async remove(id: number): Promise<void> {
        const result = await this.profileRepository.delete(id);
        if (result.affected === 0) {
            throw new Error('Puesto no encontrado');
        }
    }

    // Actualizar un puesto por ID
    async update(id: number, profileData: Partial<Profile>): Promise<Profile> {
        const Profile = await this.profileRepository.findOne({ where: { ID_Profile: id } });
  
        if (!Profile) {
            throw new Error('Puesto no encontrado');
        }

        // Actualiza los datos del puesto
        Object.assign(Profile, profileData);

        return this.profileRepository.save(Profile);
    }
}
