import { Configuration, OpenAIApi } from 'openai';
import { ConfigurationParameters } from 'openai/configuration';

export abstract class BaseClientService {
  protected openai: OpenAIApi;

  protected constructor(param: ConfigurationParameters) {
    this.auth(param);
  }

  private auth(param: ConfigurationParameters) {
    const configuration: Configuration = new Configuration(param);

    this.openai = new OpenAIApi(configuration);
  }
}
