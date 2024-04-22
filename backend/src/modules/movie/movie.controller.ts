import { Controller, Get, Param, Query } from '@nestjs/common';
import { MovieService } from './movie.service';
import { QueryDto } from '../../commons/dto/query.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Movie')
@Controller('movie')
export class MovieController {
  constructor(private readonly service: MovieService) {}

  @Get('now_playing')
  async getNowPlaying(@Query() { page }: QueryDto) {
    return this.service.getNowPlaying(+page);
  }

  @Get('popular')
  async getPopular(@Query() { page }: QueryDto) {
    return this.service.getPopular(+page);
  }

  @Get('upcoming')
  async getUpcoming(@Query() { page }: QueryDto) {
    return this.service.getUpcoming(+page);
  }

  @Get('top_rated')
  async getTopRated(@Query() { page }: QueryDto) {
    return this.service.getTopRated(+page);
  }

  @Get(':id')
  async getDetails(@Param('id') id: string) {
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
  async getSimilarMovies(@Param('id') id: string) {
    return this.service.getSimilarMovies(+id);
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
