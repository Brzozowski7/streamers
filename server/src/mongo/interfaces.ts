import { IsString, IsOptional } from 'class-validator';
import { Schema } from 'mongoose';

export interface BaseDBProperties {
  _id?: Schema.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

export class PaginateRequest {
  @IsOptional()
  @IsString()
  limit: number;

  @IsOptional()
  @IsString()
  page: number;
}
