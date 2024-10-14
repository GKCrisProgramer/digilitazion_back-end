import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { Profile } from 'src/entities/profile/profile';
import { CreateProfileDto } from './DTO/create-profile.dto';

@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) {}

    // Endpoint para crear un puesto con validacion
    @Post()
    async create(@Body() CreatePuestoDto: CreateProfileDto) {
        return this.profileService.createProfile(CreatePuestoDto);
    }

    // Endpoint para obtener todos los puestos
    @Get()
    findAll() {
        return this.profileService.findAll();
    }

    // Endpoint para obtener un puesto por su ID
    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.profileService.findOne(id);
    }

    // Endpoint para eliminar un puesto
    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.profileService.remove(id);
    }

    // Endpoint para actualizar un puesto
    @Put(':id')
    update(@Param('id') id: number, @Body() profileData: Partial<Profile>) {
        return this.profileService.update(id, profileData);
    }
}
