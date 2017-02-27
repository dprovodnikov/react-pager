import UserModel from '../models/user';
import jwt from 'jsonwebtoken';
import config from '../config';

export function signUp(req, res, next) {
  const { username = '', password = '' } = req.body;

  if (!username.trim() || !password.trim()) {
    return next({
      status: 400,
      message: 'Bad credentials'
    })
  }

  UserModel.create({ username, password })
    .then(user => {
      return res
        .status(201)
        .json({ user: user.username });
    })
    .catch(({ message }) => {
      next({
        status: 400,
        message
      });
    });
}

export function signIn(req, res, next) {
  const { username = '', password = '' } = req.body;

  if (!username.trim() || !password.trim()) {
    return next({
      status: 400,
      message: 'Bad credentials'
    })
  }

  UserModel.findOne({ username })
    .then(user => {

      if (!user) {
        return next({
          status: 400,
          message: 'User not found'
        })
      }

      if (user.checkPassword(password)) {
        const token = jwt.sign({ _id: user._id }, config.secret);

        res.json({ token });
      } else {
        return next({
          status: 400,
          message: 'Bad credentials'
        })
      }

    })
    .catch(next)
}