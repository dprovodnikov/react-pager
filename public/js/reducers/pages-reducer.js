import types from '../actions/types';

const initialState = {
  currentPage: 1,
  perPage: 15,
  pagesRange: 2
};

export default function(state = initialState, { type, payload }) {
  switch(type) {
    case types.PAGE_CHANGE: {
      return Object.assign({}, state, {
        currentPage: payload,
      });
    }
    default: {
      return state
    }
  }
};