import { Module, ValidationPipe } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import CustomAppLogger from 'libs/lib/src/logger';
import { OwnMongooseModule } from 'libs/lib/src/mongo/module';
import { ApiModule } from './api/api.module';
import { OwnConfigModule } from './config/config.module';
import { RoutesModule } from './routes/routes.module';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { LoggerErrorInterceptor } from 'nestjs-pino';

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
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true,
        whitelist: true,
      }),
    },
    { provide: APP_INTERCEPTOR, useValue: new LoggerErrorInterceptor() },
  ],
})
export class AppModule {}
