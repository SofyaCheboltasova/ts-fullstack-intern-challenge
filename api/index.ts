import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { Client } from 'pg';

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
  // const client = new Client({
  //   host: 'cat-pinterest-api-pg',
  //   port: 5432,
  //   user: 'postgres',
  //   password: '1',
  // });
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'Sofya2002',
  });
  const databaseName = 'support_lk_db';

  try {
    await client.connect();
    const result = await client.query(
      `SELECT 1 FROM pg_database WHERE datname = '${databaseName}'`,
    );

    if (result.rowCount === 0) {
      await client.query(`CREATE DATABASE ${databaseName}`);
      console.log(`Database ${databaseName} created`);
    }
  } catch (error) {
    console.error('Error while creating database:', error);
  } finally {
    await client.end();
  }
}
