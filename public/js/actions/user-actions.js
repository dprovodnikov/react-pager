import dispatcher from '../dispatcher';

export function registrate(credentials) {
  dispatcher.dispatch({
    type: 'REGISTER_USER',
    credentials,
  })
}

export function authorizate(credentials) {
  dispatcher.dispatch({
    type: 'AUTHORIZE_USER',
    credentials,
  })
}

export function logout() {
  dispatcher.dispatch({ type: 'LOGOUT' })
}
