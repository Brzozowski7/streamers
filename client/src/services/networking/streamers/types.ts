import { BaseDBProperties, Photo } from '../types';

export enum StreamingPlatform {
  TWITCH = 'Twitch',
  YOUTUBE = 'YouTube',
  KICK = 'Kick',
  RUMBLE = 'Rumble',
  TIKTOK = 'TikTok',
}

export enum VoteType {
  UP = 'UP',
  DOWN = 'DOWN',
}

export interface Streamer extends BaseDBProperties {
  name: string;
  description: string;
  platform: StreamingPlatform;
  upVotes: number;
  downVotes: number;
  photo: Photo;
}

export interface CreateStreamer {
  name: string;
  description: string;
  platform: StreamingPlatform;
}

export interface AddVote {
  vote: VoteType;
}
