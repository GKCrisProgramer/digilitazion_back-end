import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/usuarios/usuarios';
import { UserController } from './usuarios/usuarios.controller';
import { UserService } from './usuarios/usuarios.service';
import { Puesto } from './entities/puestos/puestos'; // Importa ambas entidades
import { PuestoService } from './puesto/puesto.service';
import { PuestoController } from './puesto/puesto.controller';
import { DepartamentoService } from './departamento/departamento.service';
import { DepartamentoController } from './departamento/departamento.controller';
import { Departamento } from './entities/departamento/departamento';
import { DepartamentoPuesto } from './entities/depaxpues/depaxpues'
import { DepartamentoPuestoService } from './depaxpues/depaxpues.service';
import { DepartamentoPuestoController } from './depaxpues/depaxpues.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root', // Tu usuario de MySQL
      password: 'GKCJA5P@', // Tu contraseña de MySQL
      database: 'digitalizacionmod2', // Nombre de tu base de datos
      entities: [User, Puesto,Departamento,DepartamentoPuesto], // Aquí agregarás tus entidades
      synchronize: true, // Sincroniza las entidades con la base de datos (para desarrollo, cuidado en producción)
    }),
    TypeOrmModule.forFeature([Puesto,User,Departamento, DepartamentoPuesto]), // Asegúrate de registrar las entidades
  ],
  controllers: [AppController, UserController, PuestoController, DepartamentoController, DepartamentoPuestoController],
  providers: [AppService, PuestoService, UserService, DepartamentoService, DepartamentoPuestoService],
})
export class AppModule {}
