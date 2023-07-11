import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StreamerRepository } from './streamer.repository';
import { Streamer, StreamerSchema } from './streamer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Streamer.name, schema: StreamerSchema }]),
  ],
  providers: [StreamerRepository],
  exports: [MongooseModule, StreamerRepository],
})
export class StreamerSchemaModule { }
