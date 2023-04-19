import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './services/search.service';
import { Location } from '../../entities/location.entity';

@Controller('search')
export class SearchController {
  constructor(private searchService: SearchService) {}
  @Get('/location')
  async location(
    @Query('place') place: string,
    @Query('type') type: string,
  ): Promise<Location[]> {
    return this.searchService.search(type, place);
  }
}
