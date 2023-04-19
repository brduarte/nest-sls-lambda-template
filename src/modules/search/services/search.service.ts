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

  /**
   * @description Busca locais com base indicados com base nos parâmetros de busca
   * @param type - Tipo de busca ex: Bar. Praia, Trilha
   * @param place - Local pode ser pais, cidade ou estado
   */
  public async search(type: string, place: string): Promise<Location[]> {
    let response: Location[];

    const places: Location[] =
      await this.locationRepository.findByCountryAndType(place, type);

    if (places.length) {
      response = [...places];
    } else {
      response = [...(await this.findImagesBySuggestion(type, place))];
    }

    return response;
  }
  private async findImagesBySuggestion(
    type: string,
    place: string,
  ): Promise<Location[]> {
    const result: Location[] = [];
    const suggestions: any[] = await this.findSuggestion(type, place);

    for (const suggestion of suggestions) {
      const locationExist: Location =
        await this.locationRepository.findOneNameByType(
          suggestion.name,
          suggestion.type,
        );

      if (locationExist) {
        result.push(locationExist);
      } else {
        result.push(await this.createNewLocation(suggestion));
      }
    }

    return result;
  }

  private async createNewLocation(suggestion): Promise<Location> {
    const images: ImageDto[] = await this.customSearchService.searchImage(
      `Fotos de ${suggestion.name} - ${suggestion.country}`,
    );

    return this.locationRepository.save({
      ...suggestion,
      images,
    } as unknown as Location);
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
