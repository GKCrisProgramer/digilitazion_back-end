import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Puesto } from '../entities/puestos/puestos';
import { CreatePuestoDto } from './DTO/create-puesto.dto';

@Injectable()
export class PuestoService {
  constructor(
    @InjectRepository(Puesto)
    private puestoRepository: Repository<Puesto>,
  ) {}

  // Crear un nuevo puesto
  async createPuesto(PuestoData: CreatePuestoDto): Promise<Puesto> {
    const {Puestos_Nombre} = PuestoData;

    // Validar si ya existe el puesto
    const existingUser = await this.puestoRepository.findOne({ where: { Puestos_Nombre } });
    if (existingUser) {
    throw new Error('El Puesto ya existe');
    }

    // Crear el puesto y guardarlo en la base de datos
    const newUser = this.puestoRepository.create(PuestoData);
    return this.puestoRepository.save(newUser);
  }

  // Obtener todos los usuarios
  async findAll(): Promise<Puesto[]> {
    return this.puestoRepository.find(); // Trae todos los puestos
  }

  // Buscar un puesto por ID
  async findOne(id: number): Promise<Puesto> {
    const user = await this.puestoRepository.findOne({ where: { ID_Puestos: id } });
    if (!user) {
      throw new Error('Puesto no encontrado');
    }
    return user;
  }

  // Eliminar un puesto por ID
  async remove(id: number): Promise<void> {
    const result = await this.puestoRepository.delete(id);
      if (result.affected === 0) {
        throw new Error('Puesto no encontrado');
      }
    }

  // Actualizar un puesto por ID
  async update(id: number): Promise<Puesto> {
    const Puesto = await this.puestoRepository.findOne({ where: { ID_Puestos: id } });
  
    if (!Puesto) {
      throw new Error('Puesto no encontrado');
    }

    // Actualiza los datos del usuario
    Object.assign(Puesto);

    return this.puestoRepository.save(Puesto);
  }
}
