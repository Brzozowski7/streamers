import { Module } from '@nestjs/common';
import CustomAppLogger from 'libs/lib/src/logger';
import { OwnMongooseModule } from 'libs/lib/src/mongo/module';
import { ApiModule } from './api/api.module';
import { AppService } from './app.service';
import { OwnConfigModule } from './config/config.module';
import { RoutesModule } from './routes/routes.module';

@Module({
  imports: [
    CustomAppLogger,
    ApiModule,
    OwnConfigModule,
    OwnMongooseModule,
    RoutesModule,
  ],
  providers: [AppService],
})
export class AppModule {}
