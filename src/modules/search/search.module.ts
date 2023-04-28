import { Module } from '@nestjs/common';
import { GoogleModule } from '../../commons/providers/google/google.module';
import { OpenaiModule } from '../../commons/providers/openai/openai.module';
import { SearchController } from './search.controller';
import { SearchService } from './services/search.service';
import { LocationRepository } from './repositories/location.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from '../../entities/location.entity';
import { Image } from '../../entities/image.entity';
import { Thumbnail } from '../../entities/thumbnail.entity';
import DatabaseModule from '../../commons/database/database.module';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([Location, Image, Thumbnail]),
    GoogleModule,
    OpenaiModule,
  ],
  controllers: [SearchController],
  providers: [SearchService, LocationRepository],
  exports: [LocationRepository],
})
export class SearchModule {}
