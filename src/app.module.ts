import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
//DEPARTAMENTOS
import { Department } from './entities/department/department';
import { DepartmentService } from './department/department.service';
import { DepartmentController } from './department/department.controller';
//DEPARTAMENTOS X DOCUMENTOS
import { DepartmentDocument } from './entities/depaxdocu/depaxdocu';
import { DepartmentDocumentService } from './depaxdocu/depaxdocu.service';
import { DepartmentDocumentController } from './depaxdocu/depaxdocu.controller';
//DEPARTAMENTOS X PERFILES
import { DepartmentProfile } from './entities/depaxprof/depaxprof';
import { DepartmentProfileService } from './depaxprof/depaxprof.service';
import { DepartmentProfileController } from './depaxprof/depaxprof.controller';
//DOCUMENTOS
import { Document } from './entities/document/document';
import { DocumentService } from './document/document.service';
import { DocumentController } from './document/document.controller';
//DOCUMENTOS X PERFILES
import { DocumentProfile } from './entities/docuxprof/docuxprof';
import { DocumentProfileService } from './docuxprof/docuxprof.service';
import { DocumentProfileController } from './docuxprof/docuxprof.controller';
//PERFILES
import { Profile } from './entities/profile/profile';
import { ProfileService } from './profile/profile.service';
import { ProfileController } from './profile/profile.controller';
//USUARIOS
import { User } from './entities/user/user';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
//CATEGORIAS
import { Category } from './entities/category/category';
import { CategoryService } from './category/category.service';
import { CategoryController } from './category/category.controller';
//AREAS
import { Area } from './entities/area/area';
import { AreaService } from './area/area.service';
import { AreaController } from './area/area.controller';
//AREAS X DEPARTAMENTOS
import { AreaDepartment } from './entities/areaxdepartment/areaxdepartment';
import { AreaDepartmentService } from './areaxdepartment/areaxdepartment.service';
import { AreaDepartmentController } from './areaxdepartment/areaxdepartment.controller';
//AREAS X PERFILES
import { AreaProfile } from './entities/areaxprofile/areaxprofile';
import { AreaProfileService } from './areaxprofile/areaxprofile.service';
import { AreaProfileController } from './areaxprofile/areaxprofile.controller';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [
        Department,
        DepartmentDocument,
        DepartmentProfile,
        Document,
        DocumentProfile,
        Profile,
        User,
        Category,
        Area,
        AreaDepartment,
        AreaProfile,
      ],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([
      Department,
      DepartmentDocument,
      DepartmentProfile,
      Document,
      DocumentProfile,
      Profile,
      User,
      Category,
      Area,
      AreaDepartment,
      AreaProfile,
    ]),
  ],
  controllers: [
    AppController,
    DepartmentController,
    DepartmentDocumentController,
    DepartmentProfileController,
    DocumentController,
    DocumentProfileController,
    ProfileController,
    UserController,
    CategoryController,
    AreaController,
    AreaDepartmentController,
    AreaProfileController,
  ],
  providers: [
    DepartmentService,
    DepartmentDocumentService,
    DepartmentProfileService,
    DocumentService,
    DocumentProfileService,
    ProfileService,
    UserService,
    CategoryService,
    AreaService,
    AreaDepartmentService,
    AreaProfileService,
  ],
})
export class AppModule {}
