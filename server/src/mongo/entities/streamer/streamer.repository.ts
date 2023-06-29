import { InjectModel } from '@nestjs/mongoose';

import { StreamerDocument, Streamer } from './streamer.schema';
import { PaginateModel } from 'mongoose';
import { MongoRepository } from 'libs/lib/src/mongo/mongo.repository';

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
