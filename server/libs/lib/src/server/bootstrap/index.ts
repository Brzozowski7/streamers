import {
  INestApplication,
  INestMicroservice,
  ValidationPipe,
} from '@nestjs/common';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import {
  DocumentBuilder,
  SwaggerModule,
  SwaggerCustomOptions,
} from '@nestjs/swagger';
import helmet from 'helmet';

const _commonSetup = (app: INestMicroservice | INestApplication) => {
  // #################
  // #  Logger  #
  // #################
  app.useLogger(app.get(Logger));
  app.useGlobalInterceptors(new LoggerErrorInterceptor());

  // #########
  // # PIPES #
  // #########
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
};

export const bootstrapMicroservice = (app: INestMicroservice) => {
  _commonSetup(app);
};

export const bootstrapServer = (
  app: INestApplication,
  appPortEnvString: string,
) => {
  _commonSetup(app);

  // #################
  // #  MiddleWares  #
  // #################
  app.use(
    helmet({
      crossOriginEmbedderPolicy: { policy: 'credentialless' },
      contentSecurityPolicy: {
        useDefaults: true,
      },
    }),
  );

  // #############
  // #  Swagger  #
  // #############
  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Swagger')
      .setDescription('Swagger-Docs')
      .setVersion('1.0')
      .addBearerAuth({
        in: 'header',
        type: 'http',
      })
      .addSecurityRequirements('bearer')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    const customOptions: SwaggerCustomOptions = {
      swaggerOptions: {
        persistAuthorization: true,
        docExpansion: 'none',
        filter: '',
      },
    };
    SwaggerModule.setup('api', app, document, customOptions);
  }

  const config = app.get(ConfigService);
  const port = config.get<number>(appPortEnvString);
  return port;
};
