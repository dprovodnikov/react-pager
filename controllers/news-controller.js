import NewsModel from '../models/news';

// retrieve all the data
export function getAll(req, res, next) {
  NewsModel.find({})
    .then(news => {
      res.json({ news });
    })
    .catch(next);
}

// create an instance
export function save(req, res, next) {
  const { title = '', content = '' } = req.body;

  if (!title.trim() || !content.trim()) {
    return next({
      status: 400,
      message: 'Bad credentials'
    });
  }

  NewsModel.create({ title, content })
    .then(news => {
      return res
        .status(201)
        .json({ news })
    })
    .catch(next);
}

// delete an instance
export function remove(req, res, next) {
  const { id:_id } = req.body;

  if (!_id) {
    return next({
      status: 400,
      message: 'Bad credentials',
    });
  }

  NewsModel.remove({ _id })
    .then(affected => {
      return res.json(affected);
    })
    .catch(next);
}

// update an instance
export function update(req, res, next) {
  const { id:_id, title = '', content = '' } = req.body;

  if (!title.trim() || !content.trim() || !_id) {
    return next({
      status: 400,
      message: 'Bad credentials'
    })
  }

  NewsModel.update({ _id }, { title, content })
    .then(news => {
      return res
        .status(201)
        .json({ news });
    })
    .catch(next);
}

// get page by page number
export function getPage(req, res, next) {
  const { pageNumber, perPage } = req.params;

  

  res.json({ pageNumber, perPage });
}




















