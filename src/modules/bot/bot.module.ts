import { Module } from '@nestjs/common';
import { OpenaiModule } from '../../commons/providers/openai/openai.module';
import { BotController } from './bot.controller';
import { BotService } from './services/bot.service';
import { SearchModule } from '../search/search.module';
import { ArticleRepository } from '../article/repositories/article.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from '../../entities/location.entity';
import { Image } from '../../entities/image.entity';
import { Thumbnail } from '../../entities/thumbnail.entity';
import { Article } from '../../entities/article.entity';
import ConfigModule from '../../commons/config/config.module';
import { ArticleModule } from '../article/article.module';

@Module({
  imports: [
    ConfigModule,
    OpenaiModule,
    SearchModule,
    ArticleModule,
    TypeOrmModule.forFeature([Location, Image, Thumbnail, Article]),
  ],
  providers: [BotService],
  controllers: [BotController],
})
export class BotModule {}