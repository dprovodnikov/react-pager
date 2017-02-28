import dispatcher from '../dispatcher';
import types from '../actions/types';

export function registrate(credentials) {
  dispatcher.dispatch({
    type: types.REGISTER_USER,
    credentials,
  })
}

export function authorizate(credentials) {
  dispatcher.dispatch({
    type: types.AUTHORIZE_USER,
    credentials,
  })
}

export function logout() {
  dispatcher.dispatch({ type: types.LOGOUT })
}
