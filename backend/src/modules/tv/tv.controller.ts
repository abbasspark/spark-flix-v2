import { Controller, Get, Param, Query } from '@nestjs/common';
import { TvService } from './tv.service';
import { QueryDto } from '../../commons/dto/query.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Tv')
@Controller('tv')
export class TvController {
  constructor(private readonly service: TvService) {}

  @Get('now_playing')
  async getNowPlaying(@Query() { page }: QueryDto) {
    return this.service.getOnAir(+page);
  }

  @Get('popular')
  async getPopular(@Query() { page }: QueryDto) {
    return this.service.getPopular(+page);
  }

  @Get('top_rated')
  async getTopRated(@Query() { page }: QueryDto) {
    return this.service.getTopRated(+page);
  }

  @Get(':id')
  async getDetails(@Param('id') id: string): Promise<any> {
    return this.service.getDetails(+id);
  }

  @Get(':id/translations')
  async getTranslations(@Param('id') id: string) {
    return this.service.getTranslations(+id);
  }

  @Get(':id/credits')
  async getCredits(@Param('id') id: string) {
    return this.service.getCredits(+id);
  }

  @Get(':id/similar')
  async getSimilarTVShows(@Param('id') id: string) {
    return this.service.getSimilarTVShows(+id);
  }

  @Get(':id/recommendations')
  async getRecommendations(@Param('id') id: string) {
    return this.service.getRecommendations(+id);
  }

  @Get(':id/images')
  async getImages(@Param('id') id: string) {
    return this.service.getImages(+id);
  }

  @Get(':id/reviews')
  async getReviews(@Param('id') id: string) {
    return this.service.getReviews(+id);
  }
}
