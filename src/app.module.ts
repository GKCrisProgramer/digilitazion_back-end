import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/usuarios/usuarios';
import { UsuariosController } from './usuarios/usuarios.controller';
import { Puesto } from './entities/puestos/puestos'; // Importa ambas entidades
import { PuestoService } from './puesto/puesto.service';
import { PuestoController } from './puesto/puesto.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root', // Tu usuario de MySQL
      password: 'GKCJA5P@', // Tu contraseña de MySQL
      database: 'digitalizacionmod2', // Nombre de tu base de datos
      entities: [User, Puesto], // Aquí agregarás tus entidades
      synchronize: true, // Sincroniza las entidades con la base de datos (para desarrollo, cuidado en producción)
    }),
    TypeOrmModule.forFeature([Puesto]), // Asegúrate de registrar la entidad
  ],
  controllers: [AppController, UsuariosController, PuestoController],
  providers: [AppService, PuestoService],
})
export class AppModule {}
