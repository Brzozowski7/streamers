import { applyDecorators } from '@nestjs/common';
import { Prop, PropOptions } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';

export function RequiredProp(options?: PropOptions<unknown>) {
  return applyDecorators(
    // eslint-disable-next-line @typescript-eslint/ban-types
    Prop({ required: true, ...(options as object) }),
    IsNotEmpty(),
  );
}
