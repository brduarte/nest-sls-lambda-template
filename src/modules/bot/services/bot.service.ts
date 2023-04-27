import { Injectable } from '@nestjs/common';
import { TextService } from '../../../commons/providers/openai/services/text.service';
import { CreateCompletionRequest, CreateCompletionResponse } from 'openai';
import { ArticleRepository } from '../repositories/article.repository';

@Injectable()
export class BotService {
  constructor(
    private textService: TextService,
    private articleRepository: ArticleRepository,
  ) {}

  public async writeArticle() {
    const article = await this.articleGenerate('Rio de Janeiro');

    await this.articleRepository.save({
      locations,
      content: article,
    });
  }

  private async articleGenerate(subject: string) {
    const article: CreateCompletionResponse =
      await this.textService.completionArticle(subject);

    return article.choices[0].text;
  }
}
