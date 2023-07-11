import { SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';
import { BaseSchema } from 'src/mongo/common-schemas';
import { CommonSchema, RequiredProp } from 'src/mongo/decorators';

export type PhotoDocument = Photo & Document;

@CommonSchema()
export class Photo extends BaseSchema {
  @RequiredProp()
  uploaderStreamerId: string;

  @RequiredProp()
  externalId: string;

  @RequiredProp()
  thumbnailUrl: string;

  @RequiredProp()
  url: string;

  @RequiredProp()
  originalHeight: number;

  @RequiredProp()
  originalWidth: number;

  @RequiredProp()
  filePath: string;
}

export const photoAutopopulate = { select: 'url thumbnailUrl externalId' };

export const PhotoSchema = SchemaFactory.createForClass(Photo);
