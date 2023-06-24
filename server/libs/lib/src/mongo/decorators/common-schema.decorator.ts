import { Schema, SchemaOptions } from '@nestjs/mongoose';

export function CommonSchema(options?: SchemaOptions) {
  return Schema({ timestamps: true, ...options });
}
