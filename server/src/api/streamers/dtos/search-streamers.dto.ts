import { IsEnum, IsOptional, IsString } from 'class-validator';
import { StreamingPlatform } from '../../../types/streamers/streaming-platform';
import { ApiProperty } from '@nestjs/swagger';
import { PaginateRequest } from 'src/mongo/interfaces';

export class SearchStreamersDTO extends PaginateRequest {
  @ApiProperty({ type: String })
  @IsOptional()
  @IsString()
  streamer: string;

  @ApiProperty({ type: [String], enum: StreamingPlatform })
  @IsOptional()
  @IsEnum(StreamingPlatform, { each: true })
  platforms: StreamingPlatform[];
}
