import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/usuarios/usuarios';
import { Puesto } from '../entities/puestos/puestos';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Puesto)
    private puestoRepository: Repository<Puesto>,
  ) {}

  async createUser(username: string, password: string, puestoId: number): Promise<User> {
    const puesto = await this.puestoRepository.findOne({ where: { id: puestoId } });
    const newUser = this.userRepository.create({ username, password, puesto });
    return this.userRepository.save(newUser);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find({ relations: ['puesto'] });
  }
}
