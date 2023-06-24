import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PhotoRepository } from './photo.repository';
import { Photo, PhotoSchema } from './photo.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Photo.name, schema: PhotoSchema }]),
  ],
  providers: [PhotoRepository],
  exports: [MongooseModule, PhotoRepository],
})
export class PhotoSchemaModule {}
