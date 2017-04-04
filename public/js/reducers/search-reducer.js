import types from '../actions/types';

export default function(state = '', action) {
  switch(action.type) {
    case types.SEARCH_QUERY_CHANGE: {
      return action.payload
    }
    default: {
      return state
    }
  }
};