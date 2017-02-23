import express from 'express';
import config from './config';
import { join } from 'path';
import errorHandler from './middlewares/error-handler';

const app = express();

app.use(express.static(join(__dirname, '/public')));

app.listen(config.port, err => {
  if (err) throw err;

  console.log(`Running on port ${config.port}`);
});

app.use((req, res, next) => res.redirect('/'));
app.use(errorHandler);
