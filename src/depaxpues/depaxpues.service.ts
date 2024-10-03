import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DepartamentoPuesto } from '../entities/depaxpues/depaxpues';
import { CreateRelacionDto } from './DTO/create-relacion.dto';
import { UpdateRelacionDto } from './DTO/update-relacion.dto';
import { Departamento } from '../entities/departamento/departamento'; // Asegúrate de importar las entidades correctas
import { Puesto } from '../entities/puestos/puestos'; // Asegúrate de importar las entidades correctas

@Injectable()
export class DepartamentoPuestoService {
  constructor(
    @InjectRepository(DepartamentoPuesto)
    private departamentoPuestoRepository: Repository<DepartamentoPuesto>,
    @InjectRepository(Departamento)
    private departamentoRepository: Repository<Departamento>,  // Inyección del repositorio de Departamento
    @InjectRepository(Puesto)
    private puestoRepository: Repository<Puesto>,  // Inyección del repositorio de Puesto
  ) {}

  async createRelacion(createRelacionDto: CreateRelacionDto): Promise<DepartamentoPuesto> {
    const { ID_Departamento, ID_Puestos } = createRelacionDto;

    // Busca el Departamento por ID
    const departamento = await this.departamentoRepository.findOne({
      where: { ID_Departamento },
    });

    if (!departamento) {
      throw new Error('Departamento no encontrado');
    }

    // Busca el Puesto por ID
    const puesto = await this.puestoRepository.findOne({
      where: { ID_Puestos },
    });

    if (!puesto) {
      throw new Error('Puesto no encontrado');
    }

    // Crea la nueva relación usando las entidades relacionadas
    const nuevaRelacion = this.departamentoPuestoRepository.create({
      departamento, // Asignamos la entidad Departamento
      puesto,       // Asignamos la entidad Puesto
    });

    return this.departamentoPuestoRepository.save(nuevaRelacion);
  }

  // Obtener todas las relaciones
  async findAll(): Promise<DepartamentoPuesto[]> {
    return this.departamentoPuestoRepository.find({ relations: ['departamento', 'puesto'] });
  }

  //Función para eliminar una relación
  async remove(id: number): Promise<void> {
    const result = await this.departamentoPuestoRepository.delete(id); // Cambié a `departamentoPuestoRepository`
    if (result.affected === 0) {
      throw new Error('Relación no encontrada');
    }
  }

  //Función para actualizar una relación
  async update(id: number, updateRelacionDto: UpdateRelacionDto): Promise<DepartamentoPuesto> {
    const { ID_Departamento, ID_Puestos } = updateRelacionDto;

    const relacion = await this.departamentoPuestoRepository.findOne({
      where: { ID_DXP: id },
      relations: ['departamento', 'puesto'],
    });

    if (!relacion) {
      throw new Error('Relación no encontrada');
    }

    // Si se proporcionó un ID_Departamento, actualizamos el departamento
    if (ID_Departamento) {
      const departamento = await this.departamentoRepository.findOne({
        where: { ID_Departamento },
      });

      if (!departamento) {
        throw new Error('Departamento no encontrado');
      }

      relacion.departamento = departamento;
    }

    // Si se proporcionó un ID_Puestos, actualizamos el puesto
    if (ID_Puestos) {
      const puesto = await this.puestoRepository.findOne({
        where: { ID_Puestos },
      });

      if (!puesto) {
        throw new Error('Puesto no encontrado');
      }

      relacion.puesto = puesto;
    }

    return this.departamentoPuestoRepository.save(relacion);
  }

  // Obtener todos los puestos relacionados a un departamento específico
  async getPuestosByDepartamento(departamentoId: number): Promise<Puesto[]> {
    const relaciones = await this.departamentoPuestoRepository.find({
      where: { departamento: { ID_Departamento: departamentoId } },
      relations: ['puesto'], // Asegúrate de incluir la relación para obtener los puestos
    });
    return relaciones.map(rel => rel.puesto); // Extrae los puestos de las relaciones
  }
}