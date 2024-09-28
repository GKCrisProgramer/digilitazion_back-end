import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DepartamentoPuesto } from '../entities/depaxpues/depaxpues';
import { CreateRelacionDto } from '../depaxpues/DTO/create-relacion.dto';
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
}

/*export class DepartamentoPuestoService {
  constructor(
    @InjectRepository(DepartamentoPuesto)
    private readonly depPuestoRepository: Repository<DepartamentoPuesto>,
  ) {}

  // Crear una relación entre Departamento y Puesto
  async create(departamento: Departamento, puesto: Puesto): Promise<DepartamentoPuesto> {
    const nuevaRelacion = this.depPuestoRepository.create({ departamento, puesto });
    return this.depPuestoRepository.save(nuevaRelacion);
  }

  // Obtener todas las relaciones
  async findAll(): Promise<DepartamentoPuesto[]> {
    return this.depPuestoRepository.find({ relations: ['departamento', 'puesto'] });
  }
} */