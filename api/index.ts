import { NestFactory } from '@nestjs/core';
import { Client } from 'pg';
import { env } from 'process';
import { AppModule } from './src/app.module';

async function bootstrap() {
  await createDatabase();
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:8080',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization, X-User-Id',
    exposedHeaders: ['x-auth-token'],
  });
  await app.listen(3000);
}
bootstrap();

async function createDatabase() {
  const client = new Client({
    host: env.POSTGRES_HOST,
    port: 5432,
    user: env.POSTGRES_USER,
    password: env.POSTGRES_PASSWORD,
  });
  try {
    await client.connect();
    const result = await client.query(
      `SELECT 1 FROM pg_database WHERE datname = '${env.POSTGRES_DB}'`,
    );

    if (result.rowCount === 0) {
      await client.query(`CREATE DATABASE ${env.POSTGRES_DB}`);
      console.log(`Database ${env.POSTGRES_DB} created`);
    }
  } catch (error) {
    console.error('Error while creating database:', error);
  } finally {
    await client.end();
  }
}
