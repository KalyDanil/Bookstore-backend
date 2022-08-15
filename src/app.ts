import express from 'express';
import cors from 'cors';
import config from './config';
import globalErrHandler from './middlewares/globalErrHandler';
import router from './routers/router';

const app = express();

app.use(cors({ origin: [config.frontHost] }));
app.use(express.json(({ limit: '50mb' })));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use(express.static('public'));

router(app);

app.use(globalErrHandler);

export default app;
