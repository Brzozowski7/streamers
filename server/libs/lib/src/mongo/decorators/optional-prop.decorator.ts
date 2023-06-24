import { applyDecorators } from '@nestjs/common';
import { Prop, PropOptions } from '@nestjs/mongoose';
import { Allow, IsOptional } from 'class-validator';

export function OptionalProp(
  defaultValue: unknown,
  options?: PropOptions<unknown>,
) {
  return applyDecorators(
    // eslint-disable-next-line @typescript-eslint/ban-types
    Prop({ required: false, default: defaultValue, ...(options as object) }),
    Allow(),
    IsOptional(),
  );
}
