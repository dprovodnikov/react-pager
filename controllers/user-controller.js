import UserModel from '../models/user';
import bcrypt from 'bcrypt-as-promised';
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

  let _id;

  UserModel.findOne({ username })
    .then(user => {

      if (!user) {
        return next({
          status: 400,
          message: 'User not found'
        })
      }

      _id = user._id;
      
      return user.checkPassword(password)
    })
    .then(() => {
      const token = jwt.sign({ _id }, config.secret);
      res.json({ token });
    })
    .catch(err => {
      if (err instanceof bcrypt.MISMATCH_ERROR) {
        next({
          status: 400,
          message: 'Bad credentials'
        })
      } else {
        next(err);
      }
    })
}