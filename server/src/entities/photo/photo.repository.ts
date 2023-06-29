import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Photo, PhotoDocument } from './photo.schema';
import { MongoRepository } from 'libs/lib/src/mongo/mongo.repository';

export class PhotoRepository extends MongoRepository<
  Photo,
  Model<PhotoDocument>
> {
  constructor(
    @InjectModel(Photo.name)
    model: Model<PhotoDocument>,
  ) {
    super(model);
  }
}
