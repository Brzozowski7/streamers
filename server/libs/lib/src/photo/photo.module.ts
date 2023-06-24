import { Module } from '@nestjs/common';

import { PhotoService } from './photo.service';
import { PhotoSchemaModule } from '../mongo/entities/photo/photo-schema.module';

@Module({
  imports: [PhotoSchemaModule],
  providers: [PhotoService],
  exports: [PhotoService],
})
export class PhotoModule { }
