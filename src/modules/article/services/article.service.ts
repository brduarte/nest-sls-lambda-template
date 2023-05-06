import { Injectable } from '@nestjs/common';
import { ArticleRepository } from '../repositories/article.repository';
import { Article } from '../../../entities/article.entity';

@Injectable()
export class ArticleService {
  constructor(private articleRepository: ArticleRepository) {}

  async getArticle(): Promise<Article[]> {
    return this.articleRepository.find();
  }
}
