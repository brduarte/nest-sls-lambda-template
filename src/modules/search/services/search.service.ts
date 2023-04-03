import { Injectable } from '@nestjs/common';
import { TextService } from '../../../commons/providers/openai/services/text.service';
import { CustomSearchService } from '../../../commons/providers/google/services/custom-search.service';

@Injectable()
export class SearchService {
  constructor(
    private textService: TextService,
    private customSearchService: CustomSearchService,
  ) {}

  public async searchLocations() {
    const suggestions = await this.findSuggestion('Bares', 'Gramado');

    return this.findImagesBySuggestion(suggestions);
  }
  private async findImagesBySuggestion(suggestions: string[]) {
    const execute = suggestions.map(async (suggestion) => {
      const images = await this.customSearchService.searchImage(suggestion);

      return {
        title: suggestion,
        images,
      };
    });

    return Promise.all(execute);
  }
  private async findSuggestion(category: string, location: string) {
    const { choices } = await this.textService.completion(category, location);

    return choices[0].text.split('\n').filter((value) => value !== '');
  }
}
