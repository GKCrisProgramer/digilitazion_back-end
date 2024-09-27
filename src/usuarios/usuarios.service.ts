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
}
