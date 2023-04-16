import { Module } from '@nestjs/common';
import { CustomSearchService } from './services/custom-search.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [CustomSearchService],
  exports: [CustomSearchService],
  imports: [ConfigModule],
})
export class GoogleModule {}
