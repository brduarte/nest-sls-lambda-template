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

    //Todo descomentar quando tiver pronto
    // const { data } = await this.openai.createCompletion({
    //   model: 'text-davinci-003',
    //   prompt: prompt,
    //   temperature: 0.5,
    //   max_tokens: 150,
    //   top_p: 1.0,
    //   frequency_penalty: 0.0,
    //   presence_penalty: 0.0,
    // });

    return {
      id: 'cmpl-70sy1wB5tbtCyqtLuXR7PvQ0nYfn7',
      object: 'text_completion',
      created: 1680445649,
      model: 'text-davinci-003',
      choices: [
        {
          text: '\n\n1. Parque Terra Mágica Florybal\n2. Lago Negro\n3. Mini Mundo\n4. Parque da Ferradura\n5. Parque do Lago Joaquina Rita Bier\n6. Museu de Cera de Gramado\n7. Parque da Cidade\n8. Palácio dos Festivais\n9. Parque das Bromélias\n10. Parque Municipal do Caracol',
          index: 0,
          logprobs: null,
          finish_reason: 'stop',
        },
      ],
      usage: {
        prompt_tokens: 13,
        completion_tokens: 101,
        total_tokens: 114,
      },
    };
  }

  private mountText(category: string, location: string) {
    return '#category# legais para visitar em:  #location#'
      .replace(/#(location)#/g, location)
      .replace(/#(category)#/, category);
  }
}
