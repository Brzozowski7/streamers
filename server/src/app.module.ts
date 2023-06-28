import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import CustomAppLogger from 'libs/lib/src/logger';
import { OwnMongooseModule } from 'libs/lib/src/mongo/module';
import { ApiModule } from './api/api.module';
import { AppService } from './app.service';
import { OwnConfigModule } from './config/config.module';
import { RoutesModule } from './routes/routes.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../../client/build'),
      exclude: ['/api/(.*)'],
    }),
    CustomAppLogger,
    ApiModule,
    OwnConfigModule,
    OwnMongooseModule,
    RoutesModule,
  ],
  providers: [AppService],
})
export class AppModule {}
