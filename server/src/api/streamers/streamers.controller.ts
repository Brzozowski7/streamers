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
import { StreamersService } from './streamers.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiPaginatedResponse } from 'libs/lib/src/decorators/ApiPaginatedResponse.decorator';
import { Streamer } from 'src/mongo/entities/streamer';
import { Photo } from 'src/mongo/entities/photo';
import { CreateStreamerDTO } from 'src/api/streamers/dtos/create-streamer.dto';
import { SearchStreamersDTO } from 'src/api/streamers/dtos/search-streamers.dto';
import { StreamerIdParam } from 'src/types/streamers/streamer-id-param';
import { StreamerVoteDTO } from 'src/api/streamers/dtos/streamer-vote.dto';


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
