import express from 'express';
import config from './config';
import { join } from 'path';
import errorHandler from './middlewares/error-handler';
import checkToken from './middlewares/check-token';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import newsRouter from './routes/news-routes';
import userRouter from './routes/user-routes';

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.db, (err) => {
  if (err) throw err;

  console.log('Database connected');
});

app.use(express.static(join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/user', userRouter);
app.use('/news', checkToken);
app.use('/news', newsRouter);

app.listen(config.port, err => {
  if (err) throw err;

  console.log(`Running on port ${config.port}`);
});

app.use((req, res, next) => res.redirect('/'));
app.use(errorHandler);
