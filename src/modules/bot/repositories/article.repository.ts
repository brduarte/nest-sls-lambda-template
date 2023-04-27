import { DataSource, MongoRepository } from 'typeorm';
import { Article } from '../../../entities/article.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ArticleRepository extends MongoRepository<Article> {
  constructor(private dataSource: DataSource) {
    super(Article, dataSource.createEntityManager());
  }
}
