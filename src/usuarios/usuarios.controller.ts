import { Controller, Post, Body, Get, Param } from '@nestjs/common';
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

  /*@Get()
  async AllUsers(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }*/
}