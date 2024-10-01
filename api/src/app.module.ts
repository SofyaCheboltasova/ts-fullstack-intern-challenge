import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { env } from 'process';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LikeModule } from './like/like.module';
import { CatModule } from './cat/cat.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { User } from './user/user.entity';
import { Like } from './like/like.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: env.POSTGRES_HOST,
      port: 5432,
      username: env.POSTGRES_USER,
      password: env.POSTGRES_PASSWORD,
      database: env.POSTGRES_DB,
      synchronize: true,
      logging: true,
      entities: [User, Like],
    }),
    UserModule,
    CatModule,
    LikeModule,
  ],
})
export class AppModule {}
