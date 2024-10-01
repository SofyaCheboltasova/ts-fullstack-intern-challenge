import { Module } from '@nestjs/common';
import { CatModule } from './cat/cat.module';
import { LikeModule } from './like/like.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { Like } from './like/like.entity';
import { UserModule } from './user/user.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      // host: 'cat-pinterest-api-pg',
      // port: 5432,
      // username: 'postgres',
      // password: '1',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Sofya2002',
      database: 'support_lk_db',
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
