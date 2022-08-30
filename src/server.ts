import app from './app';
import config from './config';
import { AppDataSource } from './database/dataSource';

const server = async () => {
  const dbConnection = await AppDataSource.initialize();
  if (dbConnection.isInitialized) {
    console.log('Data Source has been initialized');
    app.listen(config.port, () => {
      console.log('Server is working');
    });
    return;
  }
  console.log('Data source not initialized');
};

server();
