import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { ApiModule } from 'src/api/api.module';
import { StreamersModule } from 'src/api/streamers/streamers.module';

@Module({
  imports: [
    RouterModule.register([
      {
        path: 'api',
        module: ApiModule,
        children: [{ path: 'streamers', module: StreamersModule }],
      },
    ]),
  ],
})
export class RoutesModule {}
