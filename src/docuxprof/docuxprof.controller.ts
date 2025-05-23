import { Controller, Post, Body, Get, Delete, Param, ParseIntPipe, Put, Query } from '@nestjs/common';
import { CreateRelationDto } from './DTO/create-relation.dto';
import { DocumentProfileService } from './docuxprof.service';
import { UpdateRelationDto } from './DTO/update-relation.dto';

@Controller('document-profile')
export class DocumentProfileController {
  constructor(private readonly documentProfileService: DocumentProfileService) {}

  @Post()
  async create(@Body() createRelationDto: CreateRelationDto) {
    return this.documentProfileService.createRelation(createRelationDto);
  }

  @Get()
  async findAll() {
    return this.documentProfileService.findAll();
  }

  // Eliminar una relación por ID
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.documentProfileService.remove(id);
  }

  // Actualizar una relación por ID
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number, 
    @Body() updateRelationDto: UpdateRelationDto
  ) {
    return this.documentProfileService.update(id, updateRelationDto);
  }


  //encontrar por puesto
  @Get('profile/:profileId')
  async findByProfile(@Param('profileId', ParseIntPipe) profileId: number) {
    return this.documentProfileService.findByProfile(profileId);
  }

  //ESTE CODIGO SE USARA CUANDO YA SE TENGA OTRO INDICE
  @Get('profile/:profileId/category/:categoryId')
  async findByProfileWithCategory(
    @Param('profileId', ParseIntPipe) profileId: number,
    @Param('categoryId', ParseIntPipe) categoryId: number
  ) {
    return this.documentProfileService.findByProfileWithCategory(profileId, categoryId);
  }
  
}