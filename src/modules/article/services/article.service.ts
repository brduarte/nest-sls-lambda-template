import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ArticleRepository } from '../repositories/article.repository';
import { Article } from '../../../entities/article.entity';

@Injectable()
export class ArticleService {
  constructor(private articleRepository: ArticleRepository) {}

  async getArticles(category?: string): Promise<Article[]> {
    return this.articleRepository.getArticles(category);
  }

  async getCategories() {
    const categories = await this.articleRepository.getCategories();

    return categories.map((category) => category.id);
  }

  async getArticleById(id: string): Promise<Article> {
    const result: Article = await this.articleRepository.findById(id);

    if (!result) {
      throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
    }

    return result;
  }
}
