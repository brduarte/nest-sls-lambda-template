import { Injectable } from '@nestjs/common';
import { customsearch } from 'googleapis/build/src/apis/customsearch';
import { ImagesTransform } from '../transformes/images.trasform';

@Injectable()
export class CustomSearchService {
  public async searchImage(search: string) {
    const { data } = await this.search(search, {
      q: search,
      searchType: 'image',
      imgType: 'photo',
      num: 3,
    });

    return ImagesTransform.execute(data.items);
  }

  private async search(search: string, config: any) {
    return customsearch('v1').cse.list({
      auth: 'AIzaSyCrvcRbBS-6sLxDCV-qe30ozJd-JtfCmzk',
      cx: 'f4cf28bd70d6a4a45',
      safe: 'ACTIVE',
      lr: 'lang_pt',
      ...config,
    });
  }
}
