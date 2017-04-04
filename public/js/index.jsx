import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './routes.jsx';
import promiseMiddleware from 'redux-promise';
import reducers from './reducers';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import '../stylus/index.styl'

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware)(createStore);

render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app-root')
);