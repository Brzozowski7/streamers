import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { StreamerSchemaModule } from './entities/streamer/streamer-schema.module';
import { PhotoSchemaModule } from './entities/photo/photo-schema.module';


@Module({
  imports: [
    StreamerSchemaModule,
    PhotoSchemaModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const uri = configService.get<string>('NEST_MONGO_URI');
        const options: MongooseModuleOptions = {
          uri,
          connectionFactory: (connection) => {
            return connection;
          },
        };

        return options;
      },
    }),
  ],
})
export class OwnMongooseModule { }
