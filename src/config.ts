import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const config = {
  database: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,
    dbPort: +process.env.DB_PORT,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  },
  frontHost: process.env.FRONT_HOST,
  port: +process.env.PORT,
  tokenKey: process.env.TOKENKEY,
  saltRounds: +process.env.SALTROUNDS,
  expiresIn: +process.env.EXPIRESIN,
};

export default config;
