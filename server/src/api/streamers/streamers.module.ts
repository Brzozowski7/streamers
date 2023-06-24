import { Module } from '@nestjs/common';
import { StreamersController } from './streamers.controller';
import { StreamersService } from './streamers.service';
import { StreamerSchemaModule } from 'libs/lib/src/mongo/entities/streamer/streamer-schema.module';
import { SocketModule } from '../socket/socket.module';
import { PhotoModule } from 'libs/lib/src/photo/photo.module';

@Module({
  imports: [StreamerSchemaModule, SocketModule, PhotoModule],
  controllers: [StreamersController],
  providers: [StreamersService],
})
export class StreamersModule {}
