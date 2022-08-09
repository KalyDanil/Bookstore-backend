import express from 'express';
import cors from 'cors';
import config from './config';
import globalErrHandler from './middlewares/globalErrHandler';
import router from './routers/index';
import { AppDataSource } from './database/dataSource';

const app = express();

app.use(cors({ origin: [config.frontHost] }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname} + /public`));

AppDataSource.initialize().then(() => {
  console.log("Data Source has been initialized!")
}).catch(error => console.log(error))

router(app);

app.use(globalErrHandler);

export default app;
