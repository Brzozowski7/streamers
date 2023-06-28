import { NestApplicationOptions } from '@nestjs/common';
import dotenv from 'dotenv';
dotenv.config();

const COMMON_SERVER_SETTINGS: NestApplicationOptions = {
  bufferLogs: true,
  cors: true,
  httpsOptions: null
};



export default COMMON_SERVER_SETTINGS;
