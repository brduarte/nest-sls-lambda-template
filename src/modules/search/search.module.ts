import { Module } from '@nestjs/common';
import { GoogleModule } from '../../commons/providers/google/google.module';
import { OpenaiModule } from '../../commons/providers/openai/openai.module';
import { SearchController } from './search.controller';
import { SearchService } from './services/search.service';

@Module({
  imports: [GoogleModule, OpenaiModule],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
