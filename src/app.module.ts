import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import User from './users/entity/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.dev.env'],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '192.168.2.41',
      port: 3307,
      username: 'user',
      password: 'user',
      database: 'island_game_local',
      entities: [User],
      synchronize: true,
      logging: true,
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
