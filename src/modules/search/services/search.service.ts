import { Injectable } from '@nestjs/common';
import { TextService } from '../../../commons/providers/openai/services/text.service';
import { CustomSearchService } from '../../../commons/providers/google/services/custom-search.service';
import { ImageDto } from '../../../commons/providers/google/dtos/image.dto';

@Injectable()
export class SearchService {
  constructor(
    private textService: TextService,
    private customSearchService: CustomSearchService,
  ) {}

  public async searchLocations(category: string, location: string) {
    const suggestions: string[] = await this.findSuggestion(category, location);

    return this.findImagesBySuggestion(suggestions, location);
  }
  private async findImagesBySuggestion(
    suggestions: string[],
    location: string,
  ) {
    const execute = suggestions.map(async (suggestion) => {
      const images: ImageDto[] = await this.customSearchService.searchImage(
        `Melhores Fotos de ${suggestion} - ${location}`,
      );

      return {
        title: suggestion,
        images,
      };
    });

    return Promise.all(execute);
  }
  private async findSuggestion(
    category: string,
    location: string,
  ): Promise<string[]> {
    const { choices } = await this.textService.completion(category, location);

    return choices[0].text.split('\n').filter((value) => value !== '');
  }
}
