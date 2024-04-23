import { Controller, Get, Query } from '@nestjs/common';
import { DiscoverService } from './discover.service';
import { ApiTags } from '@nestjs/swagger';
import { MovieQueryDto, TvQueryDto } from './dto/discover.query.dto';

@ApiTags('Discover')
@Controller('discover')
export class DiscoverController {
  constructor(private readonly service: DiscoverService) {}

  @Get('movie')
  async getMovie(@Query() query?: MovieQueryDto) {
    return this.service.getMovie({
      query: {
        ...query,
        include_adult: query.include_adult === 'true' ? true : false,
        include_video: query.include_adult === 'true' ? true : false,
      },
    });
  }

  @Get('tv')
  async getTv(@Query() query?: TvQueryDto) {
    return this.service.getTv({
      query: {
        ...query,
        include_null_first_air_dates: query.include_null_first_air_dates === 'true' ? true : false,
        screened_theatrically: query.screened_theatrically === 'true' ? true : false,
      },
    });
  }
}
