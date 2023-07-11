import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { SocketGateway } from '../socket/socket.gateway';
import { CreateStreamerDTO } from './dtos/create-streamer.dto';
import { StreamerRepository } from 'src/entities/streamer';
import { PhotoService } from 'src/photo/photo.service';
import { SearchStreamersDTO } from './dtos/search-streamers.dto';
import { StreamersQuery } from 'src/types/streamers/streamers-query';
import { StreamerVoteDTO } from './dtos/streamer-vote.dto';
import { VoteType } from 'src/types/streamers/vote-type';

@Injectable()
export class StreamersService {
  constructor(
    private readonly streamerRepository: StreamerRepository,
    private readonly socketGateway: SocketGateway,
    private readonly photoService: PhotoService,
  ) {}

  async createStreamer(payload: CreateStreamerDTO) {
    const foundStreamer = await this.streamerRepository.findOne({
      name: payload.name,
    });

    if (foundStreamer) throw new BadRequestException('Streamer already exists');

    const createdStreamer = await this.streamerRepository.create(payload);

    this.socketGateway.notifyNewStreamer();

    return createdStreamer;
  }

  async getStreamers(payload: SearchStreamersDTO) {
    const query: StreamersQuery = {};

    if (payload.streamer)
      query.name = { $regex: payload.streamer, $options: 'i' };

    if (payload.platforms) query.platform = { $in: payload.platforms };

    const options = {
      page: payload.page || 1,
      limit: payload.limit || 10,
      select: 'name upVotes downVotes',
    };

    const streamers = await this.streamerRepository.model.paginate(
      query,
      options,
    );

    return streamers;
  }

  async getStreamer(streamerId: string) {
    const foundStreamer = await this.streamerRepository.findById(streamerId);

    if (!foundStreamer) throw new NotFoundException('Streamer not found');

    return foundStreamer;
  }

  async vote(payload: StreamerVoteDTO, streamerId: string) {
    const foundStreamer = await this.streamerRepository.findById(streamerId);

    if (!foundStreamer) throw new NotFoundException('Streamer not found');

    const votesToIncrease =
      payload.vote === VoteType.UP ? 'upVotes' : 'downVotes';

    foundStreamer[votesToIncrease] += 1;

    await foundStreamer.save();

    this.socketGateway.notifyVoteUpdate();

    return foundStreamer;
  }

  async addStreamerPhoto(photoData: Express.Multer.File, streamerId: string) {
    const foundStreamer = await this.streamerRepository.findById(streamerId);

    if (!foundStreamer) throw new NotFoundException('Streamer not found');

    const photo = photoData.buffer.toJSON().data;

    const streamerPhoto = await this.photoService.upload(
      Buffer.from(photo),
      'streamerPhoto',
      streamerId,
      `streamers/${streamerId}`,
    );

    foundStreamer.photo = streamerPhoto;

    await foundStreamer.save();

    return streamerPhoto;
  }
}
