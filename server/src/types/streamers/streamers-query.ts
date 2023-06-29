import { StreamingPlatform } from './streaming-platform';

export interface StreamersQuery {
  name?: { $regex: string; $options: string };
  platform?: { $in: StreamingPlatform[] };
}
