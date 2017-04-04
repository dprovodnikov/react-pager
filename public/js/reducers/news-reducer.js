import types from '../actions/types';

const initialState = {
  total: 0,
  onPage: []
};

export default (state = initialState, { type, payload }) => {
  switch(type) {
    case types.NEWS_DELETE: {
      return state;
    }
    case types.ADD_NEWS: {
      return state;
    }
    case types.FETCH_NEWS_COUNT: {
      return Object.assign({}, state, {
        total: payload.count,
      });
    }
    case types.FETCH_NEWS_FOR_PAGE: {
      return Object.assign({}, state, {
        onPage: payload.news
      });
    }
    default: {
      return state;
    }
  }
};