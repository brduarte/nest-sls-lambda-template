import { Injectable } from '@nestjs/common';
import { customsearch } from 'googleapis/build/src/apis/customsearch';
import { ImagesTransform } from '../transformes/images.trasform';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CustomSearchService {
  constructor(private configService: ConfigService) {}
  public async searchImage(search: string) {
    const { data } = await this.search(search, {
      q: search,
      searchType: 'image',
      imgType: 'stock',
      num: 3,
    });

    return ImagesTransform.execute(data.items);
  }

  private async search(search: string, config: any) {
    return customsearch('v1').cse.list({
      auth: this.configService.getOrThrow('google.customSearch.auth'),
      cx: this.configService.getOrThrow('google.customSearch.cx'),
      safe: 'ACTIVE',
      lr: 'lang_pt',
      ...config,
    });
  }
}
