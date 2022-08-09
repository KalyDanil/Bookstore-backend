import dotenv from 'dotenv';

dotenv.config();

const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;
const host = process.env.DB_HOST;
const dialect = process.env.DB_DIALECT;
const database = {
  user,
  password,
  dbName,
  host,
  dialect,
  logging: false,
};
const frontHost = process.env.FRONT_HOST;
const port = +process.env.PORT;
const tokenKey = process.env.TOKENKEY;
// const saltRounds = +process.env.SALTROUNDS;
// const expiresIn = +process.env.EXPIRESIN;

const config = {
  database,
  frontHost,
  port,
  tokenKey,
  // saltRounds,
  // expiresIn
};

export default config;
