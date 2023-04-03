import { Module } from '@nestjs/common';
import DatabaseModule from './commons/database/database.module';

@Module({
  imports: [DatabaseModule],
})
export class AppModule {}
