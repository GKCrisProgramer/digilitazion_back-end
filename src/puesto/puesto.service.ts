import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Puesto } from '../entities/puestos/puestos';

@Injectable()
export class PuestoService {
  constructor(
    @InjectRepository(Puesto)
    private puestoRepository: Repository<Puesto>,
  ) {}

  // Crear un nuevo puesto
  async create(nombre: string): Promise<Puesto> {
    const nuevoPuesto = this.puestoRepository.create({ nombre });
    return this.puestoRepository.save(nuevoPuesto);
  }

  // Obtener todos los puestos
  findAll(): Promise<Puesto[]> {
    return this.puestoRepository.find();
  }

  // Obtener un puesto por ID
  findOne(id: number): Promise<Puesto> {
    return this.puestoRepository.findOne({ where: { id } });
  }

  // Actualizar un puesto
  async update(id: number, nombre: string): Promise<Puesto> {
    const puesto = await this.puestoRepository.findOne({ where: { id } });
    if (puesto) {
      puesto.nombre = nombre;
      return this.puestoRepository.save(puesto);
    }
    return null; // Manejo de error si no se encuentra el puesto
  }

  // Eliminar un puesto
  async remove(id: number): Promise<void> {
    await this.puestoRepository.delete(id);
  }
}
