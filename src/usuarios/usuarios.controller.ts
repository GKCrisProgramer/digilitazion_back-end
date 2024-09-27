import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { User } from '../entities/usuarios/usuarios';

@Controller('users')
export class UsuariosController {
  constructor(private readonly userService: UsuariosService) {}

  /*@Post()
  create(@Body() userData: Partial<User>) {
    return this.userService.createUser(userData);
  }*///por el momento hasta mañana xp

  @Get()
  findAll() {
    return this.userService.findAll();
  }
}
