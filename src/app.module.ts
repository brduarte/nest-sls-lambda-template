import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import DatabaseModule from './commons/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { OpenaiModule } from './commons/providers/openai/openai.module';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([UserEntity]),
    OpenaiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
