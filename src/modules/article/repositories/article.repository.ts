import { DataSource, MongoRepository } from 'typeorm';
import { Article } from '../../../entities/article.entity';
import { Injectable } from '@nestjs/common';
import { ObjectID } from 'mongodb';

@Injectable()
export class ArticleRepository extends MongoRepository<Article> {
  constructor(private dataSource: DataSource) {
    super(Article, dataSource.createEntityManager());
  }

  getArticles(type?: string) {
    return this.find({
      where: {
        type: type,
      },
    });
  }

  findById(id: string): Promise<Article> {
    return this.findOne(new ObjectID(id));
  }

  async getCategories() {
    return this.aggregateEntity([
      {
        $group: { _id: '$type' },
      },
    ]).toArray();
  }
}
