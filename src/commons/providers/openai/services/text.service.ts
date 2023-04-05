import { BaseClientService } from './base-client.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TextService extends BaseClientService {
  constructor() {
    super({
      organization: 'org-OSl1JKP42K2b8fT0yMxk62Kf',
      apiKey: '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',
    });
  }

  public async completion(category: string, location: string) {
    const prompt = this.mountText(category, location);

    const { data } = await this.openai.createCompletion({
      model: 'text-davinci-003',
      prompt: prompt,
      temperature: 0.5,
      max_tokens: 150,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });

    return data;
  }

  private mountText(category: string, location: string): string {
    return 'liste #category# legais para um turista visitar em #location#'
      .replace(/#(location)#/g, location)
      .replace(/#(category)#/, category);
  }
}
