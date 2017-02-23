import request from 'request-promise';
import mongoose from 'mongoose';
import config from '../config';
import NewsModel from '../models/news.js';

mongoose.Promise = global.Promise;
mongoose.connect(config.db, err => {
  if (err) throw err;
})

NewsModel.remove({})
  .then(affected => {
    return request('http://jsonplaceholder.typicode.com/posts')
  })
  .then(response => {
    const posts = JSON.parse(response);

    console.log('Generating...');

    posts.forEach((post, i) => {
      const { title, body:content } = post;

      NewsModel.create({ title, content })
        .then(news => {
          if (i == posts.length - 1) process.exit(0); 
        })
        .catch(err => {
          if (err) throw err;
        });

    });

  })
  .catch(err => {
    if (err) throw err;
  })

