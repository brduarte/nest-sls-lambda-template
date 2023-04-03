import { Controller, Get } from '@nestjs/common';
import { SearchService } from './services/search.service';

@Controller('search')
export class SearchController {
  constructor(private searchService: SearchService) {}
  @Get('/location')
  async location() {
    return this.searchService.searchLocations();
  }
}
