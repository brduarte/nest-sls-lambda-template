import { DataSource } from 'typeorm';

import { config as setConfig } from 'dotenv';
import configService from './src/commons/config/config.service';
setConfig();

const { database } = configService();

const config = new DataSource({
  ...database,
  type: 'mysql',
  migrations: ['src/commons/database/migrations/*{.ts,.js}'],
});

export default config;
