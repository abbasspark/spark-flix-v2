import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsIn, IsOptional, IsBoolean, IsNumber, IsDate } from 'class-validator';

const Options = [
  'original_title.asc',
  'original_title.desc',
  'popularity.asc',
  'popularity.desc',
  'revenue.asc',
  'revenue.desc',
  'primary_release_date.asc',
  'title.asc',
  'title.desc',
  'primary_release_date.desc',
  'vote_average.asc',
  'vote_average.desc',
  'vote_count.asc',
  'vote_count.desc',
];

export class MovieQueryDto {
  @IsString()
  @ApiProperty({ default: '1' })
  page: string;

  @IsString()
  @IsIn(Options)
  @ApiProperty({
    enum: Options,
    default: 'popularity.desc',
  })
  sort_by?:
    | 'popularity.asc'
    | 'popularity.desc'
    | 'release_date.asc'
    | 'release_date.desc'
    | 'revenue.asc'
    | 'revenue.desc'
    | 'primary_release_date.asc'
    | 'primary_release_date.desc'
    | 'original_title.asc'
    | 'original_title.desc'
    | 'vote_average.asc'
    | 'vote_average.desc'
    | 'vote_count.asc'
    | 'vote_count.desc';

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  region?: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsString()
  certification_country?: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsString()
  certification?: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsString()
  'certification.lte'?: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsString()
  include_adult?: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsBoolean()
  include_video?: boolean;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsNumber({}, { each: true })
  primary_release_year?: number | string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsDate()
  'primary_release_date.lte'?: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsDate()
  'primary_release_date.gte'?: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsDate()
  'release_date.gte'?: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsDate()
  'release_date.lte'?: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsNumber({}, { each: true })
  'vote_count.gte'?: number | string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsNumber({}, { each: true })
  'vote_count.lte'?: number | string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsNumber({}, { each: true })
  'vote_average.gte'?: number | string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsNumber({}, { each: true })
  'vote_average.lte'?: number | string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsString()
  with_cast?: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsString()
  with_crew?: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsString()
  with_companies?: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsString()
  with_genres?: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsString()
  with_keywords?: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsString()
  with_people?: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsNumber({}, { each: true })
  year?: number | string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsString()
  without_genres?: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsNumber({}, { each: true })
  'with_runtime.gte'?: number | string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsNumber({}, { each: true })
  'with_runtime.lte'?: number | string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsString()
  with_release_type?: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsString()
  with_original_language?: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsString()
  without_keywords?: string;
}

export class TvQueryDto {
  @IsString()
  @ApiProperty({ default: '1' })
  page: string;

  @IsString()
  @IsIn([
    'vote_average.asc',
    'vote_average.desc',
    'first_air_date.asc',
    'first_air_date.desc',
    'popularity.asc',
    'popularity.desc',
  ])
  @ApiProperty({
    enum: [
      'vote_average.asc',
      'vote_average.desc',
      'first_air_date.asc',
      'first_air_date.desc',
      'popularity.asc',
      'popularity.desc',
    ],
    default: 'popularity.desc',
  })
  sort_by?:
    | 'vote_average.asc'
    | 'vote_average.desc'
    | 'first_air_date.asc'
    | 'first_air_date.desc'
    | 'popularity.asc'
    | 'popularity.desc';

  @IsOptional()
  @ApiProperty({ required: false })
  @IsNumber({}, { each: true })
  'vote_average.gte'?: number | string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsNumber({}, { each: true })
  'vote_average.lte'?: number | string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsString()
  with_genres?: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsString()
  without_genres?: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsNumber({}, { each: true })
  'with_runtime.gte'?: number | string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsNumber({}, { each: true })
  'with_runtime.lte'?: number | string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsString()
  with_original_language?: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsString()
  without_keywords?: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsString()
  with_companies?: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsDate()
  'air_date.gte'?: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsDate()
  'air_date.lte'?: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsDate()
  'first_air_date.gte'?: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsDate()
  'first_air_date.lte'?: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsNumber({}, { each: true })
  first_air_date_year?: number | string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsString()
  timezone?: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsString()
  with_networks?: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsString()
  include_null_first_air_dates?: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsString()
  screened_theatrically?: string;
}
