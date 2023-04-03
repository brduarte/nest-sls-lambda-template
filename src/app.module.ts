import { Module } from '@nestjs/common';
import DatabaseModule from './commons/database/database.module';
import { SearchModule } from './modules/search/search.module';

@Module({
  imports: [DatabaseModule, SearchModule],
})
export class AppModule {}
