import { Test, TestingModule } from '@nestjs/testing';
import { StreamersService } from './streamers.service';
import { StreamerDocument, StreamerRepository } from 'src/entities/streamer';
import { SocketGateway } from '../socket/socket.gateway';
import { PhotoService } from 'src/photo/photo.service';
import { CreateStreamerDTO } from 'src/api/streamers/dtos/create-streamer.dto';
import { SearchStreamersDTO } from 'src/api/streamers/dtos/search-streamers.dto';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { StreamerVoteDTO } from 'src/api/streamers/dtos/streamer-vote.dto';
import { VoteType } from 'src/types/streamers/vote-type';
import { StreamingPlatform } from 'src/types/streamers/streaming-platform';
import { PaginateResult } from 'mongoose';

describe('StreamersService', () => {
  let service: StreamersService;
  let streamerRepository: StreamerRepository;
  let socketGateway: SocketGateway;
  let photoService: PhotoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StreamersService,
        {
          provide: StreamerRepository,
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            findById: jest.fn(),
            model: {
              paginate: jest.fn(),
            },
          },
        },
        {
          provide: SocketGateway,
          useValue: {
            notifyNewStreamer: jest.fn(),
            notifyVoteUpdate: jest.fn(),
          },
        },
        {
          provide: PhotoService,
          useValue: {
            upload: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<StreamersService>(StreamersService);
    streamerRepository = module.get<StreamerRepository>(StreamerRepository);
    socketGateway = module.get<SocketGateway>(SocketGateway);
    photoService = module.get<PhotoService>(PhotoService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createStreamer', () => {
    it('should create a new streamer and return the created streamer', async () => {
      const payload: CreateStreamerDTO = {
        name: 'Streamer 1',
        platform: StreamingPlatform.TWITCH,
        description: 'Test description',
      };

      const createdStreamer = { _id: '1', ...payload };

      jest
        .spyOn(streamerRepository, 'findOne')
        .mockResolvedValueOnce(undefined);

      jest
        .spyOn(streamerRepository, 'create')
        .mockResolvedValueOnce(createdStreamer as never);

      const result = await service.createStreamer(payload);

      expect(streamerRepository.findOne).toHaveBeenCalledWith({
        name: payload.name,
      });
      expect(streamerRepository.create).toHaveBeenCalledWith(payload);
      expect(socketGateway.notifyNewStreamer).toHaveBeenCalled();
      expect(result).toEqual(createdStreamer);
    });

    it('should throw a BadRequestException if the streamer already exists', async () => {
      const payload: CreateStreamerDTO = {
        name: 'Existing Streamer',
        platform: StreamingPlatform.TWITCH,
        description: 'Test description',
      };

      jest.spyOn(streamerRepository, 'findOne').mockResolvedValueOnce({
        _id: '1',
        name: payload.name,
      } as StreamerDocument);

      await expect(service.createStreamer(payload)).rejects.toThrow(
        BadRequestException,
      );
      expect(streamerRepository.findOne).toHaveBeenCalledWith({
        name: payload.name,
      });
      expect(streamerRepository.create).not.toHaveBeenCalled();
      expect(socketGateway.notifyNewStreamer).not.toHaveBeenCalled();
    });
  });

  describe('getStreamers', () => {
    it('should return a paginated list of streamers based on the search criteria', async () => {
      const payload: SearchStreamersDTO = {
        streamer: 'Streamer',
        platforms: [StreamingPlatform.TWITCH, StreamingPlatform.YOUTUBE],
        page: 1,
        limit: 10,
      };

      const query = {
        name: { $regex: payload.streamer, $options: 'i' },
        platform: {
          $in: [StreamingPlatform.TWITCH, StreamingPlatform.YOUTUBE],
        },
      };
      const options = {
        page: payload.page,
        limit: payload.limit,
        select: 'name upVotes downVotes',
      };

      const streamers: PaginateResult<StreamerDocument> = {
        docs: [{ _id: '1', name: 'Streamer 1' } as StreamerDocument],
        total: 1,
        limit: 10,
      };

      jest
        .spyOn(streamerRepository.model, 'paginate')
        .mockResolvedValueOnce(streamers);

      const result = await service.getStreamers(payload);

      expect(streamerRepository.model.paginate).toHaveBeenCalledWith(
        query,
        options,
      );
      expect(result).toEqual(streamers);
    });
  });

  describe('getStreamer', () => {
    it('should return the streamer with the specified ID', async () => {
      const streamerId = '1';
      const foundStreamer = {
        _id: streamerId,
        name: 'Streamer 1',
      } as StreamerDocument;

      jest
        .spyOn(streamerRepository, 'findById')
        .mockResolvedValueOnce(foundStreamer);

      const result = await service.getStreamer(streamerId);

      expect(streamerRepository.findById).toHaveBeenCalledWith(streamerId);
      expect(result).toEqual(foundStreamer);
    });

    it('should throw a NotFoundException if the streamer is not found', async () => {
      const streamerId = '1';

      jest.spyOn(streamerRepository, 'findById').mockResolvedValueOnce(null);

      await expect(service.getStreamer(streamerId)).rejects.toThrow(
        NotFoundException,
      );
      expect(streamerRepository.findById).toHaveBeenCalledWith(streamerId);
    });
  });

  describe('vote', () => {
    const streamerId = '1';
    const foundStreamer = {
      _id: streamerId,
      name: 'Streamer 1',
      upVotes: 0,
      downVotes: 0,
    } as StreamerDocument;

    foundStreamer.save = jest.fn();

    it('should increase the upVotes of the streamer and return the updated streamer', async () => {
      const payload: StreamerVoteDTO = {
        vote: VoteType.UP,
      };

      jest
        .spyOn(streamerRepository, 'findById')
        .mockResolvedValueOnce(foundStreamer);

      jest.spyOn(foundStreamer, 'save').mockResolvedValueOnce(foundStreamer);

      const result = await service.vote(payload, streamerId);

      expect(streamerRepository.findById).toHaveBeenCalledWith(streamerId);
      expect(foundStreamer.upVotes).toBe(1);
      expect(foundStreamer.save).toHaveBeenCalled();
      expect(socketGateway.notifyVoteUpdate).toHaveBeenCalled();
      expect(result).toEqual(foundStreamer);
    });

    it('should increase the downVotes of the streamer and return the updated streamer', async () => {
      const payload: StreamerVoteDTO = {
        vote: VoteType.DOWN,
      };

      jest
        .spyOn(streamerRepository, 'findById')
        .mockResolvedValueOnce(foundStreamer);

      jest.spyOn(foundStreamer, 'save').mockResolvedValueOnce(foundStreamer);

      const result = await service.vote(payload, streamerId);

      expect(streamerRepository.findById).toHaveBeenCalledWith(streamerId);
      expect(foundStreamer.downVotes).toBe(1);
      expect(foundStreamer.save).toHaveBeenCalled();
      expect(socketGateway.notifyVoteUpdate).toHaveBeenCalled();
      expect(result).toEqual(foundStreamer);
    });

    it('should throw a NotFoundException if the streamer is not found', async () => {
      const payload: StreamerVoteDTO = {
        vote: VoteType.UP,
      };

      jest.spyOn(streamerRepository, 'findById').mockResolvedValueOnce(null);

      await expect(service.vote(payload, streamerId)).rejects.toThrow(
        NotFoundException,
      );

      expect(streamerRepository.findById).toHaveBeenCalledWith(streamerId);
    });
  });
});
