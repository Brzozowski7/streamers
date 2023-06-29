import { SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema } from 'mongoose';

import { Photo, photoAutopopulate } from '../photo';
import { BaseSchema } from 'libs/lib/src/mongo/common-schemas';
import { CommonSchema, OptionalProp, RequiredProp } from 'libs/lib/src/mongo/decorators';

export type StreamerDocument = Streamer & Document;

@CommonSchema()
export class Streamer extends BaseSchema {
  @RequiredProp({ type: String, unique: true })
  name: string;

  @RequiredProp({ type: String })
  platform: string;

  @RequiredProp({ type: String })
  description: string;

  @OptionalProp(null, {
    type: Schema.Types.ObjectId,
    ref: Photo.name,
    autopopulate: photoAutopopulate,
  })
  photo: Photo;

  @RequiredProp({ type: Number, default: 0 })
  upVotes: number;

  @RequiredProp({ type: Number, default: 0 })
  downVotes: number;
}

export const StreamerSchema = SchemaFactory.createForClass(Streamer);

StreamerSchema.plugin(require('mongoose-paginate-v2'));

StreamerSchema.plugin(require('mongoose-autopopulate'));
