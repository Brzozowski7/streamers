import { InjectModel } from '@nestjs/mongoose';
import { MongoRepository } from '../../mongo.repository';
import { StreamerDocument, Streamer } from './streamer.schema';
import { PaginateModel } from 'mongoose';

export class StreamerRepository extends MongoRepository<
  Streamer,
  PaginateModel<StreamerDocument>
> {
  constructor(
    @InjectModel(Streamer.name)
    model: PaginateModel<StreamerDocument>,
  ) {
    super(model);
  }
}
