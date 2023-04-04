import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './services/search.service';

@Controller('search')
export class SearchController {
  constructor(private searchService: SearchService) {}
  @Get('/location')
  async location(
    @Query('location') location: string,
    @Query('category') category: string,
  ) {
    return this.searchService.searchLocations(category, location);
  }
}
