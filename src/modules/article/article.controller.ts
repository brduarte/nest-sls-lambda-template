import { Controller, Get } from '@nestjs/common';
import { ArticleService } from './services/article.service';
import { Article } from '../../entities/article.entity';

@Controller('articles')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Get()
  async getArticle(): Promise<Article[]> {
    return this.articleService.getArticle();
  }
}
