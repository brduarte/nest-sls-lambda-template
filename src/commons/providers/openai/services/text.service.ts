import { BaseClientService } from './base-client.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TextService extends BaseClientService {
  constructor(private configService: ConfigService) {
    super({
      organization: configService.getOrThrow('openIa.organization'),
      apiKey: configService.getOrThrow('openIa.apiKey'),
    });
  }

  public async completion(category: string, location: string) {
    const prompt = this.mountText(category, location);

    const { data } = await this.openai.createCompletion({
      model: 'text-davinci-003',
      prompt: prompt,
      temperature: 0.5,
      max_tokens: 300,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });

    return data;
  }

  private mountText(category: string, location: string): string {
    return 'liste #category# legais para um turista visitar em #location#. retorne nesse padrão: nome | cidade | estado | país | tipo de logar'
      .replace(/#(location)#/g, location)
      .replace(/#(category)#/, category);
  }
}
