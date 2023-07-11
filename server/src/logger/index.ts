import { LoggerModule } from 'nestjs-pino';

const CustomAppLogger = LoggerModule.forRoot({
  pinoHttp: {
    level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'yyyy-mm-dd HH:MM:ss.l o',
        singleLine: true,
        ignore: 'hostname,pid',
      },
    },
  },
});

export default CustomAppLogger;
