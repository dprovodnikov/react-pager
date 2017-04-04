import types from '../actions/types';
import $ from 'jquery';

export const fetchUser = () => {
  const request = $.post('/user/bytoken/', {
    token: localStorage.getItem('jwt-token')
  });

  return {
    type: types.FETCH_USER,
    payload: request,
  };
}

export const registrate = ({ username, password, isAdmin = false}) => {
  const request = $.post('/user/signup', { username, password, isAdmin });

  return {
    type: types.REGISTER_USER,
    payload: request,
  };
}

export const authorizate = ({ username, password }) => {
  const request = $.post('/user/signin', { username, password })

  return {
    type: types.AUTHORIZE_USER,
    payload: request
  };
}

export const logout = () => {
  return {
    type: types.LOGOUT
  };
}
