import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchQueryDto } from './dto/search.query.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Search')
@Controller('search')
export class SearchController {
  constructor(private readonly service: SearchService) {}

  @Get('movie')
  async movies(@Query() { page, query }: SearchQueryDto) {
    return this.service.movies({ query: { page, query } });
  }

  @Get('tv')
  async tvShows(@Query() { page, query }: SearchQueryDto) {
    return this.service.tvShows({ query: { page, query } });
  }

  @Get('multi')
  async multi(@Query() { page, query }: SearchQueryDto) {
    return this.service.multi({ query: { page, query } });
  }
}
