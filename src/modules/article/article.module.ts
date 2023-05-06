import { Module } from '@nestjs/common';
import { ArticleService } from './services/article.service';
import { ArticleRepository } from './repositories/article.repository';
import { ArticleController } from './article.controller';

@Module({
  providers: [ArticleService, ArticleRepository],
  exports: [ArticleRepository],
  controllers: [ArticleController],
})
export class ArticleModule {}
