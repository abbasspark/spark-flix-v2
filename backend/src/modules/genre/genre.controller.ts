import { Controller, Get } from '@nestjs/common';
import { GenreService } from './genre.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Genre')
@Controller('genre')
export class GenreController {
  constructor(private readonly service: GenreService) {}

  @Get('movie')
  async getMovieList() {
    return this.service.getMovieList();
  }

  @Get('tv')
  async getTvList() {
    return this.service.getTvList();
  }
}
