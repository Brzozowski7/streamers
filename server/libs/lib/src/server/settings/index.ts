import { NestApplicationOptions } from '@nestjs/common';
import dotenv from 'dotenv';
import fs from "fs"
dotenv.config();
import fs from 'fs';

const COMMON_SERVER_SETTINGS: NestApplicationOptions = {
  bufferLogs: true,
  cors: true,
};

if (process.env.NODE_ENV === 'production') {
  const certsRootPath = `/etc/letsencrypt/live/${process.env.APP_DOMAIN}/`;
  const key = fs.readFileSync(certsRootPath + 'privkey.pem');
  const cert = fs.readFileSync(certsRootPath + 'cert.pem');
  const ca = fs.readFileSync(certsRootPath + 'chain.pem');
  COMMON_SERVER_SETTINGS['httpsOptions'] = {
    key,
    cert,
    ca,
  };
}

export default COMMON_SERVER_SETTINGS;
