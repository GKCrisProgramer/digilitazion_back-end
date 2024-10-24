import { Controller, Post, Body, Get, Param, Delete, Put } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './DTO/create-category.dto';
import { Category } from 'src/entities/category/category';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    //Endpoint para crear una nueva categoria con validacion
    @Post()
    async create(@Body() createCategoryDto: CreateCategoryDto) {
        return this.categoryService.createCategory(createCategoryDto);
    }

    //Endpoint para obtener todas las categorias
    @Get()
    findAll() {
        return this.categoryService.findAll();
    }

    //Endpoint para obtener una categoria por ID
    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.categoryService.findOne(id);
    }

    //Endpoint para borrar una categoria por ID
    @Delete(':id')
    remove(@Param('id') id: number){
        return this.categoryService.remove(id);
    }

    //Endpoint para actualizar un puesto
    @Put(':id')
    update(@Param('id') id: number, @Body() categoryData: Partial<Category>) {
        return this.categoryService.update(id, categoryData)
    }
}
