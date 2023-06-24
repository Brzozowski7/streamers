import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Streamer } from 'libs/lib/src/mongo/entities/streamer';
import { CreateStreamerDTO } from 'libs/lib/src/types/streamers/create-streamer.dto';
import { StreamersService } from './streamers.service';
import { StreamerIdParam } from 'libs/lib/src/types/streamers/streamer-id-param';
import { StreamerVoteDTO } from 'libs/lib/src/types/streamers/streamer-vote.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@ApiTags('/streamers')
@Controller()
export class StreamersController {
  constructor(private readonly streamersService: StreamersService) {}

  @ApiCreatedResponse({
    type: Streamer,
  })
  @Post()
  async createProduct(@Body() payload: CreateStreamerDTO) {
    return await this.streamersService.createStreamer(payload);
  }

  @ApiOkResponse({
    type: [Streamer],
  })
  @Get()
  async getStreamers() {
    return await this.streamersService.getStreamers();
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
    type: Streamer,
  })
  @Post('/:streamerId/photo')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'file' }]))
  async addStreamerPhoto(
    @UploadedFile()
    {
      file,
    }: {
      file: Express.Multer.File;
    },
    @Param() { streamerId }: StreamerIdParam,
  ) {
    return await this.streamersService.addStreamerPhoto(file, streamerId);
  }
}
