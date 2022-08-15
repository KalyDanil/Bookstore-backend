import dotenv from 'dotenv';
import _ from 'lodash';
import type { ParsedEnvType } from './types/config';

const parsedEnvFile: ParsedEnvType = dotenv.config({ path: '../.env' }).parsed;
const defaultConfig: ParsedEnvType = dotenv.config({ path: '../default.env' }).parsed;
const localConfig = parsedEnvFile || {};
const joinedConfig = _.defaultsDeep(localConfig, defaultConfig);
const config = {
  database: {
    user: joinedConfig.DB_USER,
    password: joinedConfig.DB_PASSWORD,
    dbName: joinedConfig.DB_NAME,
    dbPort: +joinedConfig.DB_PORT,
    host: joinedConfig.DB_HOST,
    dialect: joinedConfig.DB_DIALECT,
  },
  frontHost: joinedConfig.FRONT_HOST,
  port: +joinedConfig.PORT,
  tokenKey: joinedConfig.TOKENKEY,
  saltRounds: +joinedConfig.SALTROUNDS,
  expiresIn: +joinedConfig.EXPIRESIN,
};

export default config;
