import { Controller, Post, Body, Get, Param, Delete, Put } from '@nestjs/common';
import { UserService } from '../usuarios/usuarios.service';
import { User } from '../entities/usuarios/usuarios';
import { CreateUserDto } from './DTO/create-user.dto';

@Controller('users')
export class UserController{
  constructor(private readonly userService: UserService) {}

  // Endpoint para crear un nuevo usuario con validación
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  // Endpoint para obtener todos los puestos
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  // Endpoint para obtener un puesto por su ID
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  // Endpoint para eliminar un puesto
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.userService.remove(id);
  }

  // Endpoint para actualizar un puesto
  @Put(':id')
  update(@Param('id') id: number, @Body() userData: Partial<User>) {
    return this.userService.update(id, userData);
  }
}