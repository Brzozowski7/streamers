import { ApiProperty } from '@nestjs/swagger';

export abstract class BaseSchema {
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty()
  _id: string;
}
