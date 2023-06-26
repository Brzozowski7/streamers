import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Streamer } from 'libs/lib/src/mongo/entities/streamer';
import { CreateStreamerDTO } from 'libs/lib/src/types/streamers/create-streamer.dto';
import { StreamersService } from './streamers.service';
import { StreamerIdParam } from 'libs/lib/src/types/streamers/streamer-id-param';
import { StreamerVoteDTO } from 'libs/lib/src/types/streamers/streamer-vote.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { SearchStreamersDTO } from 'libs/lib/src/types/streamers/search-streamers.dto';
import { ApiPaginatedResponse } from 'libs/lib/src/decorators/ApiPaginatedResponse.decorator';
import { Photo } from 'libs/lib/src/mongo/entities/photo';

@ApiTags('/streamers')
@Controller()
export class StreamersController {
  constructor(private readonly streamersService: StreamersService) {}

  @ApiCreatedResponse({
    type: Streamer,
  })
  @Post()
  async createStreamer(@Body() payload: CreateStreamerDTO) {
    return await this.streamersService.createStreamer(payload);
  }

  @ApiPaginatedResponse(Streamer)
  @Get()
  async getStreamers(@Query() query: SearchStreamersDTO) {
    return await this.streamersService.getStreamers(query);
  }

  @ApiOkResponse({
    type: Streamer,
  })
  @Get('/:streamerId')
  async getStreamer(@Param() { streamerId }: StreamerIdParam) {
    return await this.streamersService.getStreamer(streamerId);
  }

  @ApiOkResponse({
    type: Streamer,
  })
  @Put('/:streamerId/vote')
  async vote(
    @Body() payload: StreamerVoteDTO,
    @Param() { streamerId }: StreamerIdParam,
  ) {
    return await this.streamersService.vote(payload, streamerId);
  }

  @ApiOkResponse({
    type: Photo,
  })
  @Post('/:streamerId/photo')
  @UseInterceptors(FileInterceptor('file'))
  async addStreamerPhoto(
    @UploadedFile() file: Express.Multer.File,
    @Param() { streamerId }: StreamerIdParam,
  ) {
    return await this.streamersService.addStreamerPhoto(file, streamerId);
  }
}
