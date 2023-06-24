import { NestFactory } from '@nestjs/core';
import { bootstrapServer } from 'libs/lib/src/server/bootstrap';
import COMMON_SERVER_SETTINGS from 'libs/lib/src/server/settings';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';
import { SocketIOAdapter } from './api/socket/socket-io.adapter';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, COMMON_SERVER_SETTINGS);

  app.useGlobalInterceptors(new LoggerErrorInterceptor());

  const port = bootstrapServer(app, 'APP_PORT');

  app.useWebSocketAdapter(new SocketIOAdapter(app));

  await app.listen(port);
  const logger = app.get(Logger);
  logger.log(
    `🚀 [ENV=${process.env.NODE_ENV}] [App] started on port ${port}! 🚀`,
  );
}
bootstrap();
