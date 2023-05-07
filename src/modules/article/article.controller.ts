import { Controller, Get, Param, Query } from '@nestjs/common';
import { ArticleService } from './services/article.service';
import { Article } from '../../entities/article.entity';

@Controller('articles')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Get()
  async getArticles(@Query('category') category: string): Promise<Article[]> {
    return this.articleService.getArticles(category);
  }

  @Get('categories')
  async getCategories() {
    return this.articleService.getCategories();
  }

  @Get(':id')
  async getArticle(@Param('id') id: string): Promise<Article> {
    return this.articleService.getArticleById(id);
  }
}
