import { Injectable } from '@nestjs/common';
import { TextService } from '../../../commons/providers/openai/services/text.service';
import { CustomSearchService } from '../../../commons/providers/google/services/custom-search.service';
import { ImageDto } from '../../../commons/providers/google/dtos/image.dto';
import { LocationRepository } from '../repositories/location.repository';
import { Location } from '../../../entities/location.entity';

@Injectable()
export class SearchService {
  constructor(
    private textService: TextService,
    private customSearchService: CustomSearchService,
    private locationRepository: LocationRepository,
  ) {}

  public async searchLocations(category: string, location: string) {
    const suggestions: any[] = await this.findSuggestion(category, location);

    return this.findImagesBySuggestion(suggestions, location);
  }
  private async findImagesBySuggestion(suggestions: any[], location: string) {
    const execute = suggestions.map(async (suggestion) => {
      const locationExist: Location =
        await this.locationRepository.findNameByType(
          suggestion.name,
          suggestion.type,
        );

      if (locationExist) {
        return locationExist;
      }

      const images: ImageDto[] = await this.customSearchService.searchImage(
        `Fotos de ${suggestion.name} - ${suggestion.country}`,
      );

      return await this.locationRepository.save({
        ...suggestion,
        images,
      } as unknown as Location);
    });

    return Promise.all(execute);
  }
  private async findSuggestion(category: string, location: string) {
    const { choices } = await this.textService.completion(category, location);

    const params = {
      name: 0,
      city: 1,
      state: 2,
      country: 3,
      type: 4,
    };

    const result = choices[0].text.split('\n').filter((value) => value !== '');
    return result.map((value: string) => {
      const data = value.split('|');

      return {
        name: data[params.name].replace(/\d+\./g, '').trim(),
        city: data[params.city].trim(),
        state: data[params.state].trim(),
        country: data[params.country].trim(),
        type: data[params.type].trim(),
      };
    });
  }
}
