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
    console.log('point 1')
    return next({
      status: 400,
      message: 'Bad credentials'
    })
  }

  let _user;

  UserModel.findOne({ username })
    .then(user => {
      if (!user) {
        next({
          status: 400,
          message: 'User not found'
        })
      } else {
        _user = user;
        return user.checkPassword(password)
      }
    })
    .then(() => {
      if (_user) {
        const token = jwt.sign({ _id: _user._id }, config.secret);
        res.json({
          isAdmin: _user.isAdmin,
          _id: _user._id,
          token,
        });
      }
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

export function getUserByToken(req, res, next) {
  const { token } = req.body;

  if (!token) {
    return next({
      status: 400,
      message: 'Invalid token',
    })
  }
  
  try {
    var tokenObj = jwt.verify(token, config.secret);
  } catch ({ message }) {
    return next({
      status: 400,
      message
    })
  }

  const { _id } = tokenObj;

  UserModel.findOne({ _id })
    .then(user => {
      if (!user) {
        next({
          status: 400,
          message: 'User not found'
        })
      } else {
        res.json({
          _id: user._id,
          isAdmin: user.isAdmin
        })
      }
    })


}