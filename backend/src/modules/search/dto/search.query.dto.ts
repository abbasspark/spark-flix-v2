import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class SearchQueryDto {
  @IsString()
  @ApiProperty({ default: '1' })
  page: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  query?: string;
}
