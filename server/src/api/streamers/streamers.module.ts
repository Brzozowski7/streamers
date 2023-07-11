import { Module } from '@nestjs/common';
import { StreamersController } from './streamers.controller';
import { StreamersService } from './streamers.service';

import { SocketModule } from '../socket/socket.module';
import { PhotoModule } from 'src/photo/photo.module';
import { StreamerSchemaModule } from 'src/mongo/entities/streamer/streamer-schema.module';

@Module({
  imports: [StreamerSchemaModule, PhotoModule, SocketModule],
  controllers: [StreamersController],
  providers: [StreamersService],
})
export class StreamersModule {}
