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
        const uri =
          configService.get<string>('NODE_ENV') === 'test'
            ? configService.get<string>('NEST_TEST_MONGO_URI')
            : configService.get<string>('NEST_MONGO_URI');

        console.log(uri);
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
export class OwnMongooseModule {}
