import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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



@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root', // Tu usuario de MySQL
      password: 'GKCJA5P@', // Tu contraseña de MySQL
      database: 'digitalizacionmod2', // Nombre de tu base de datos
      entities: [Department, DepartmentDocument, DepartmentProfile, Document, DocumentProfile, Profile, User], // Aquí agregarás tus entidades
      synchronize: true, // Sincroniza las entidades con la base de datos (para desarrollo, cuidado en producción)
    }),
    TypeOrmModule.forFeature([Department, DepartmentDocument, DepartmentProfile, Document, DocumentProfile, Profile, User]), // Asegúrate de registrar las entidades
  ],
  controllers: [AppController,DepartmentController, DepartmentDocumentController, DepartmentProfileController, DocumentController, DocumentProfileController, ProfileController, UserController],
  providers: [AppService,DepartmentService, DepartmentDocumentService, DepartmentProfileService, DocumentService, DocumentProfileService, ProfileService, UserService],
})
export class AppModule {}
