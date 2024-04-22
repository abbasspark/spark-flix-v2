import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class QueryDto {
  @IsString()
  @ApiProperty({ default: '1' })
  page: string;
}
