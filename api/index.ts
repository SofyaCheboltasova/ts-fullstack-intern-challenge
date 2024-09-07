import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import initDatabase from '../backend/index';

async function bootstrap() {
  await initDatabase();
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, X-Auth-Token',
    exposedHeaders: ['X-Auth-Token'],
  });
  await app.listen(8000);
}
bootstrap();
