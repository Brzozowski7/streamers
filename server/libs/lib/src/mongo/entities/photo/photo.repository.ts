import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoRepository } from '../../mongo.repository';
import { Photo, PhotoDocument } from './photo.schema';

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
