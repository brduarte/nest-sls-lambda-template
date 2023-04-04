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
    console.log(prompt);
    const { data } = await this.openai.createCompletion({
      model: 'text-davinci-003',
      prompt: prompt,
      temperature: 0.5,
      max_tokens: 150,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });

    // return {
    //   id: 'cmpl-70sy1wB5tbtCyqtLuXR7PvQ0nYfn7',
    //   object: 'text_completion',
    //   created: 1680445649,
    //   model: 'text-davinci-003',
    //   choices: [
    //     {
    //       text: '\n\n1. Parque Terra Mágica Florybal\n2. Lago Negro\n3. Mini Mundo\n4. Parque da Ferradura\n5. Parque do Lago Joaquina Rita Bier\n6. Museu de Cera de Gramado\n7. Parque da Cidade\n8. Palácio dos Festivais\n9. Parque das Bromélias\n10. Parque Municipal do Caracol',
    //       index: 0,
    //       logprobs: null,
    //       finish_reason: 'stop',
    //     },
    //   ],
    //   usage: {
    //     prompt_tokens: 13,
    //     completion_tokens: 101,
    //     total_tokens: 114,
    //   },
    // };

    return data;
  }

  private mountText(category: string, location: string): string {
    return '#category# legais para um turista visitar em: #location#'
      .replace(/#(location)#/g, location)
      .replace(/#(category)#/, category);
  }
}
