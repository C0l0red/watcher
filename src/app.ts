import express, { Request, Response } from 'express';
import services from './services';
import connect from './config/database.config';
import * as bodyParser from 'body-parser';

const app = express();
connect();

app.get('/', (req: Request, res: Response) => {
  res.send('Service Watcher');
});

app.use(bodyParser.json());
app.use('/services', services);
export default app;
