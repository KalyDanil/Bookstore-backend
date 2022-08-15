import app from './app';
import config from './config';
import { AppDataSource } from './database/dataSource';

AppDataSource.initialize().then(() => {
  console.log('Data Source has been initialized');
  app.listen(config.port, () => {
    console.log('Server is working');
  });
});
