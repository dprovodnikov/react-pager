import express from 'express';
import config from './config';
import { join } from 'path';
import errorHandler from './middlewares/error-handler';
import mongoose from 'mongoose';

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.db, (err) => {
  if (err) throw err;

  console.log('Database connected');
});

app.use(express.static(join(__dirname, '/public')));

app.listen(config.port, err => {
  if (err) throw err;

  console.log(`Running on port ${config.port}`);
});

app.use((req, res, next) => res.redirect('/'));
app.use(errorHandler);
