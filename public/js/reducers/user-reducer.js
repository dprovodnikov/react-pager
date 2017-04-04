import types from '../actions/types';

const initialState = {
  _id: null,
  isAdmin: false,
  isAuthorized: localStorage.getItem('jwt-token') ? true : false,
};

export default (state = initialState, { type, payload }) => {
  switch(type) {
    case types.REGISTER_USER: {
      return state
    }
    case types.AUTHORIZE_USER: {
      const { token, _id, isAdmin } = payload;

      localStorage.setItem('jwt-token', token);

      return Object.assign({}, state, {
        isAuthorized: true,
        isAdmin,
        _id,
      });
    }
    case types.LOGOUT: {
      localStorage.removeItem('jwt-token');

      return initialState;
    }
    case types.FETCH_USER: {
      const { _id, isAdmin } = payload;

      return Object.assign({}, state, {
        isAuthorized: true,
        isAdmin,
        _id
      });
    }
    default: {
      return state;
    }
  }
};