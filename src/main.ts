import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Habilitar validación global
  app.useGlobalPipes(new ValidationPipe());
  // Habilitar CORS
  app.enableCors({
    // Permitir solicitudes desde el frontend
    origin: 'http://localhost:4200',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    // Si deseas enviar cookies
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();
