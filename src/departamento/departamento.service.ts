import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Departamento } from '../entities/departamento/departamento';
import { CreateDepartamentoDto } from '../departamento/DTO/create-departamento.dto'

@Injectable()
export class DepartamentoService {
  constructor(
    @InjectRepository(Departamento)
    private departamentoRepository: Repository<Departamento>,
  ) {}

  // Crear un nuevo departamento
  async createPuesto(DepartamentoData: CreateDepartamentoDto): Promise<Departamento> {
    const {Departamento_Nombre} = DepartamentoData;

    // Validar si ya existe el puesto
    const existingDepartamento = await this.departamentoRepository.findOne({ where: { Departamento_Nombre } });
    if (existingDepartamento) {
    throw new Error('El departamento ya existe');
    }

    // Crear el puesto y guardarlo en la base de datos
    const newDepartamento = this.departamentoRepository.create(DepartamentoData);
    return this.departamentoRepository.save(newDepartamento);
  }

  // Obtener todos los departamentos
  async findAll(): Promise<Departamento[]> {
    return this.departamentoRepository.find(); // Trae todos los puestos
  }

  // Buscar un departamento por ID
  async findOne(id: number): Promise<Departamento> {
    const departamento = await this.departamentoRepository.findOne({ where: { ID_Departamento: id } });
    if (!departamento) {
      throw new Error('Departamento no encontrado');
    }
    return departamento;
  }

  // Eliminar un departamento por ID
  async remove(id: number): Promise<void> {
    const result = await this.departamentoRepository.delete(id);
      if (result.affected === 0) {
        throw new Error('Departamento no encontrado');
      }
    }

  // Actualizar un departamento por ID
  async update(id: number): Promise<Departamento> {
    const Departamento = await this.departamentoRepository.findOne({ where: { ID_Departamento: id } });
  
    if (!Departamento) {
      throw new Error('Departamento no encontrado');
    }

    // Actualiza los datos del departamento
    Object.assign(Departamento);

    return this.departamentoRepository.save(Departamento);
  }
}

