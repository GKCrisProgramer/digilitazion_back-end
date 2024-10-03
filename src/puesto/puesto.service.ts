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
    const existingPuesto = await this.puestoRepository.findOne({ where: { Puestos_Nombre } });
    if (existingPuesto) {
    throw new Error('El Puesto ya existe');
    }

    // Crear el puesto y guardarlo en la base de datos
    const newPuesto = this.puestoRepository.create(PuestoData);
    return this.puestoRepository.save(newPuesto);
  }

  // Obtener todos los usuarios
  async findAll(): Promise<Puesto[]> {
    return this.puestoRepository.find(); // Trae todos los puestos
  }

  // Buscar un puesto por ID
  async findOne(id: number): Promise<Puesto> {
    const puesto = await this.puestoRepository.findOne({ where: { ID_Puestos: id } });
    if (!puesto) {
      throw new Error('Puesto no encontrado');
    }
    return puesto;
  }

  // Eliminar un puesto por ID
  async remove(id: number): Promise<void> {
    const result = await this.puestoRepository.delete(id);
      if (result.affected === 0) {
        throw new Error('Puesto no encontrado');
      }
  }

  // Actualizar un puesto por ID
  async update(id: number, puestoData: Partial<Puesto>): Promise<Puesto> {
    const Puesto = await this.puestoRepository.findOne({ where: { ID_Puestos: id } });
  
    if (!Puesto) {
      throw new Error('Puesto no encontrado');
    }

    // console.log('Datos recibidos:', puestoData);
    // console.log('Puesto antes de actualizar:', Puesto)

    // Actualiza los datos del puesto
    Object.assign(Puesto, puestoData);

    // console.log('Puesto después de actualizar:', Puesto);

    return this.puestoRepository.save(Puesto);
  }
}
