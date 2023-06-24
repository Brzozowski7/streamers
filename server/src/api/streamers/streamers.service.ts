import { Injectable, NotFoundException } from '@nestjs/common';
import { StreamerRepository } from 'libs/lib/src/mongo/entities/streamer';
import { CreateStreamerDTO } from 'libs/lib/src/types/streamers/create-streamer.dto';
import { StreamerVoteDTO } from 'libs/lib/src/types/streamers/streamer-vote.dto';
import { VoteType } from 'libs/lib/src/types/streamers/vote-type';
import { SocketGateway } from '../socket/socket.gateway';
import { PhotoService } from 'libs/lib/src/photo/photo.service';

@Injectable()
export class StreamersService {
  constructor(
    private readonly streamerRepository: StreamerRepository,
    private readonly socketGateway: SocketGateway,
    private readonly photoService: PhotoService,
  ) {}

  async createStreamer(payload: CreateStreamerDTO) {
    const createdStreamer = await this.streamerRepository.create(payload);

    return createdStreamer;
  }

  async getStreamers() {
    const streamers = await this.streamerRepository.find({});

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
      'carPhoto',
      streamerId,
      `streamers/${streamerId}`,
    );

    foundStreamer.photo = streamerPhoto;

    await foundStreamer.save();

    return streamerPhoto;
  }
}
