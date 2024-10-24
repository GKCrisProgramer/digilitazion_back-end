import { Controller, Get, Post, Param, Body, Put, Delete} from '@nestjs/common';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './DTO/create-department.dto';
import { Department } from 'src/entities/department/department';


@Controller('department')
export class DepartmentController {
  constructor(private readonly DepartmentService: DepartmentService) {}

  // Endpoint para crear un departamento con validacion
  @Post()
  async create(@Body() CreateDepartmentDto: CreateDepartmentDto) {
    return this.DepartmentService.createDepartment(CreateDepartmentDto);
  }

  // Endpoint para obtener todos los departamentos
  @Get()
  findAll() {
    return this.DepartmentService.findAll();
  }

  // Endpoint para obtener un departamento por su ID
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.DepartmentService.findOne(id);
  }

  // Endpoint para eliminar un departamento
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.DepartmentService.remove(id);
  }

  // Endpoint para actualizar un departamento
  @Put(':id')
  update(@Param('id') id: number, @Body() departmentData: Partial<Department>) {
    return this.DepartmentService.update(id, departmentData);
  }
  
}
