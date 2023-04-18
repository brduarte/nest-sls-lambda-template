import { Injectable } from '@nestjs/common';
import { TextService } from '../../../commons/providers/openai/services/text.service';
import { CustomSearchService } from '../../../commons/providers/google/services/custom-search.service';
import { ImageDto } from '../../../commons/providers/google/dtos/image.dto';
import { LocationRepository } from '../../repositories/location.repository';
import { Location } from '../../../entities/location.entity';

@Injectable()
export class SearchService {
  constructor(
    private textService: TextService,
    private customSearchService: CustomSearchService,
    private locationRepository: LocationRepository,
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
      suggestion = suggestion.replace(/\d+\./g, '').trim();

      const locationExist: Location = await this.locationRepository.findByTitle(
        suggestion,
      );

      if (locationExist) {
        return locationExist;
      }

      const images: ImageDto[] = await this.customSearchService.searchImage(
        `Fotos de ${suggestion} - ${location}`,
      );

      return await this.locationRepository.save({
        title: suggestion,
        images,
      } as unknown as Location);
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
