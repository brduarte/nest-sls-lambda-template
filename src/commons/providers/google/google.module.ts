import { Module } from '@nestjs/common';
import { CustomSearchService } from './services/custom-search.service';

@Module({
  providers: [CustomSearchService],
  exports: [CustomSearchService],
})
export class GoogleModule {}
