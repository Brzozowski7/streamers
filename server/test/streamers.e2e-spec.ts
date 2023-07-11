import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { StreamingPlatform } from 'src/types/streamers/streaming-platform';
import { Streamer, StreamerDocument } from 'src/entities/streamer';

describe('StreamersController (e2e)', () => {
  let app: INestApplication;

  let testStreamer: Streamer;

  const payload = {
    name: 'Streamer Name',
    platform: StreamingPlatform.TWITCH,
    description: 'test streamer',
  };

  const nonExistentId = 'non-existent-id';

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /streamers', () => {
    it('should create a new streamer', async () => {
      const response = await request(app.getHttpServer())
        .post('/streamers')
        .send(payload)
        .expect(201);

      testStreamer = response.body;
      expect(testStreamer).toBeDefined();
      expect(testStreamer.name).toBe(payload.name);
    });

    it('should return 400 if streamer already exists', async () => {
      const response = await request(app.getHttpServer())
        .post('/streamers')
        .send(payload)
        .expect(400);

      const errorResponse = response.body;
      expect(errorResponse.message).toBe('Streamer already exists');
    });
  });

  describe('GET /streamers', () => {
    it('should retrieve a list of streamers based on search criteria', async () => {
      const response = await request(app.getHttpServer())
        .get('/streamers')
        .query({
          streamer: 'search term',
          platforms: [StreamingPlatform.TIKTOK, StreamingPlatform.RUMBLE],
          page: 1,
          limit: 10,
        })
        .expect(200);

      const streamers = response.body;
      expect(streamers).toBeDefined();
      expect(Array.isArray(streamers.docs)).toBe(true);
    });
  });

  describe('GET /streamers/:id', () => {
    it('should retrieve a specific streamer by ID', async () => {
      const response = await request(app.getHttpServer())
        .get('/streamers/:id')
        .expect(200);

      const streamer = response.body;
      expect(streamer).toBeDefined();
    });

    it('should return 404 if streamer not found', async () => {
      const response = await request(app.getHttpServer())
        .get(`/streamers/${nonExistentId}`)
        .expect(404);

      const errorResponse = response.body;
      expect(errorResponse.message).toBe('Streamer not found');
    });
  });

  describe('POST /streamers/:id/vote', () => {
    it('should increase the vote count for a streamer', async () => {
      const response = await request(app.getHttpServer())
        .post(`/streamers/${testStreamer._id}/vote`)
        .send({ vote: 'up' })
        .expect(200);

      const updatedStreamer = response.body;
      expect(updatedStreamer).toBeDefined();
    });

    it('should return 404 if streamer not found', async () => {
      const response = await request(app.getHttpServer())
        .post(`/streamers/${nonExistentId}/vote`)
        .send({ vote: 'up' })
        .expect(404);

      const errorResponse = response.body;
      expect(errorResponse.message).toBe('Streamer not found');
    });
  });
});
