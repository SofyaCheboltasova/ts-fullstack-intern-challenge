import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client } from 'pg';
import { env } from 'process';

@Injectable()
export class DatabaseProvider implements OnModuleInit {
  async onModuleInit() {
    await this.createDatabase();
  }
  private async createDatabase() {
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
}
