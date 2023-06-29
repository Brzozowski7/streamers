import { SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from 'libs/lib/src/mongo/common-schemas';
import { CommonSchema, RequiredProp } from 'libs/lib/src/mongo/decorators';
import { Document } from 'mongoose';



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
