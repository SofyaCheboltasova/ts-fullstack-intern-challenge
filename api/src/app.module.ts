import { Module } from '@nestjs/common';
import { CatModule } from './cat/cat.module';
import { ConfigModule } from '@nestjs/config';

import { LikeModule } from './like/like.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { Like } from './like/like.entity';
import { UserModule } from './user/user.module';
import { env } from 'process';
@Module({
  imports: [
    ConfigModule.forRoot(),
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
