import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/usuarios/usuarios';
import { CreateUserDto } from './DTO/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

    // Crear un nuevo usuario
  async createUser(userData: CreateUserDto): Promise<User> {
    const { Usuarios_User, Usuarios_Contra } = userData;

    // Validar si ya existe el usuario
    const existingUser = await this.userRepository.findOne({ where: { Usuarios_User } });
    if (existingUser) {
    throw new Error('El usuario ya existe');
    }

    // Encriptar la contraseña si está presente
    if (Usuarios_Contra) {
      const salt = await bcrypt.genSalt(10);
      userData.Usuarios_Contra = await bcrypt.hash(Usuarios_Contra, salt);
    }

    // Crear el usuario y guardarlo en la base de datos
    const newUser = this.userRepository.create(userData);
    return this.userRepository.save(newUser);
  }
  // Otros métodos, como findAll, findOne, update, etc.

  // Obtener todos los usuarios
  async findAll(): Promise<User[]> {
    return this.userRepository.find(); // Trae todos los usuarios
  }

  // Buscar un usuario por ID
  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { ID_Usuarios: id } });
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    return user;
  }

  // Eliminar un usuario por ID
  async remove(id: number): Promise<void> {
  const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new Error('Usuario no encontrado');
    }
  }

  // Actualizar un usuario por ID
  async update(id: number, userData: Partial<User>): Promise<User> {
    const user = await this.userRepository.findOne({ where: { ID_Usuarios: id } });
  
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    const { Usuarios_Contra } = userData;
  
    // Encriptar la contraseña si está presente
    if (Usuarios_Contra) {
      const salt = await bcrypt.genSalt(10);
      userData.Usuarios_Contra = await bcrypt.hash(Usuarios_Contra, salt);
    }

    // Actualiza los datos del usuario
    Object.assign(user, userData);

    return this.userRepository.save(user);
  }
}
