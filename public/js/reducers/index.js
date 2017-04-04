import { combineReducers } from 'redux';
import NewsReducer from './news-reducer.js';
import UserReducer from './user-reducer.js';
import PagesReducer from './pages-reducer.js';
import SearchReducer from './search-reducer.js';

const rootReducer = combineReducers({
  news: NewsReducer,
  user: UserReducer,
  pages: PagesReducer,
  searchQuery: SearchReducer,
});

export default rootReducer;