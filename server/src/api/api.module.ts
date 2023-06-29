import { Module } from '@nestjs/common';
import { StreamersModule } from './streamers/streamers.module';
import { SocketModule } from './socket/socket.module';

@Module({
  imports: [StreamersModule, SocketModule],
})
export class ApiModule {}
