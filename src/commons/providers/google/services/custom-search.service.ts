import { Injectable } from '@nestjs/common';
import { customsearch } from 'googleapis/build/src/apis/customsearch';

@Injectable()
export class CustomSearchService {
  public async searchImage(search: string) {
    const { data } = await this.search(search);

    return data.items;
  }

  private async search(search: string) {
    return customsearch('v1').cse.list({
      auth: 'AIzaSyA2qdi5lFbTaYSlI-w1fTKebf6eS8chWJQ',
      cx: 'f4cf28bd70d6a4a45',
      q: search,
      searchType: 'image',
      num: 2,
    });
  }
}
