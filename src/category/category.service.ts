import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from 'src/entities/category/category';
import { CreateCategoryDto } from './DTO/create-category.dto';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>, // corregido el typo
    ) {}

    // Crear una Nueva Categoria
    async createCategory(categoryData: CreateCategoryDto): Promise<Category> {
        const { categoryName } = categoryData;

        //validar si ya existe la categoria
        const existingCategory = await this.categoryRepository.findOne({ where: {categoryName} })
        if (existingCategory) {
            throw new BadRequestException('La categoria ya existe');
        }

        //crear el usuario y guardarlo en la base de datos
        const newCategory = this.categoryRepository.create(categoryData);
        return this.categoryRepository.save(newCategory)
    }

    //obtener todas las categorias
    async findAll(): Promise<Category[]> {
        return this.categoryRepository.find(); // Trae todos los usuarios
    }

    //buscar categoria por ID
    async findOne(id: number): Promise<Category> {
        const category = await this.categoryRepository.findOne({ where: { categoryId: id } });
        if (!category) {
            throw new NotFoundException('Categoria no encontrado');
        }
        return category;
    }

    //eliminar categoria por ID
    async remove(id:number): Promise<void>  {
        const result = await this.categoryRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException('Categoria no encontrado');
        }
    }

    // Actualizar una categoria por ID
    async update(id: number, categoryData: Partial<Category>): Promise<Category> {
        const category = await this.categoryRepository.findOne({ where: { categoryId: id} });

        if(!category) {
            throw new NotFoundException('Categoria no encontrado');
        }

        //actualizar los datos de la categoria
        Object.assign(category, categoryData);

        return this.categoryRepository.save(category);

    }
    
}
