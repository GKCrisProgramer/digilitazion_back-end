import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user/user';
import { CreateUserDto } from './DTO/crete-user-dto'; 
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    // Crear un nuevo usuario
    async createUser(userData: CreateUserDto): Promise<User> {
        const {User_User, User_Pass } = userData;

        // Validar si ya existe el usuario
        const existingUser = await this.userRepository.findOne({ where: { User_User } });
        if (existingUser) {
            throw new Error('El usuario ya existe');
        }

        // Encriptar la contraseña si está presente
        if (User_Pass) {
            const salt = await bcrypt.genSalt(10);
            userData.User_Pass = await bcrypt.hash(User_Pass, salt);
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
        const user = await this.userRepository.findOne({ where: { ID_User: id } });
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
        const user = await this.userRepository.findOne({ where: { ID_User: id } });
    
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
  
        const { User_Pass } = userData;
    
        // Encriptar la contraseña si está presente
        if (User_Pass) {
            const salt = await bcrypt.genSalt(10);
            userData.User_Pass = await bcrypt.hash(User_Pass, salt);
        }
  
        // Actualiza los datos del usuario
        Object.assign(user, userData);
  
        return this.userRepository.save(user);
    }

    // Método para validar el usuario en login
    async validateUser(username: string, password: string): Promise<any> {
        // Buscar al usuario por nombre de usuario
        const user = await this.userRepository.findOne({ where: { User_User: username } });
    
        // Si no se encuentra el usuario, retornar null
        if (!user) {
            return null;
        }
  
        // Comparar la contraseña con la almacenada
        const isPasswordValid = await bcrypt.compare(password, user.User_Pass);
    
        // Si la contraseña es válida, retornar el usuario (sin la contraseña)
        if (isPasswordValid) {
            const { User_Pass, ...result } = user;  // No devolver la contraseña
            return result;
        }
    
        // Si la contraseña no es válida, retornar null
        return null;
    }
}
