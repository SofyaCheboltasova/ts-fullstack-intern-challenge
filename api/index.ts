import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import initDatabase from '../backend/index';

async function bootstrap() {
  await initDatabase();

  const app = await NestFactory.create(AppModule);
  await app.listen(8000);
}
bootstrap();
