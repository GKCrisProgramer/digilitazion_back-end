import { Controller, Post, Body, Get, Param, Delete, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/entities/user/user';
import { CreateUserDto } from './DTO/crete-user-dto';

@Controller('user')
export class UserController {
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

    // Endpoint para autenticar al usuario
    @Post('login')
    async login(@Body() body: { username: string, password: string }) {
        const { username, password } = body;
        const user = await this.userService.validateUser(username, password);
        
        if (user) {
            return { success: true, user };  // Usuario autenticado
        } else {
            return { success: false, message: 'Usuario o contraseña incorrectos' };
        }
    }
    
}
