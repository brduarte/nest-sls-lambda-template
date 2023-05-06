import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TextService } from '../../../commons/providers/openai/services/text.service';
import { CreateCompletionResponse } from 'openai';
import { ArticleRepository } from '../../article/repositories/article.repository';
import { LocationRepository } from '../../search/repositories/location.repository';
import { RandomUtil } from '../../../Utils/Random.util';
import { Location } from '../../../entities/location.entity';

@Injectable()
export class BotService {
  constructor(
    private textService: TextService,
    private articleRepository: ArticleRepository,
    private locationRepository: LocationRepository,
  ) {}

  public async writeArticle() {
    const subject: Location = await this.generateSubjectRandom();

    const article = await this.articleGenerate(
      `${subject.name} - ${subject.state}`,
    );

    await this.articleRepository.save({
      locations: subject,
      title: article.title,
      content: article.content,
      type: subject.type,
    });
  }

  private async articleGenerate(subject: string) {
    const article: CreateCompletionResponse =
      await this.textService.completionArticle(subject);

    const title = article.choices[0].text.match(/<h1>(.*?)<\/h1>/);

    return {
      title: title[1],
      content: article.choices[0].text,
    };
  }

  private async generateSubjectRandom(): Promise<Location> {
    const subjects: Location[] = await this.locationRepository.find();

    if (!subjects.length) {
      throw new HttpException('Subject not found', HttpStatus.NOT_FOUND);
    }

    const random: number = RandomUtil.number(0, subjects.length - 1);

    return subjects[random];
  }
}
