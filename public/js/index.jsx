import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import Layout from './components/layout.jsx';
import NewsList from './components/news-list.jsx';

import Styles from '../stylus/index.styl'

const target = document.getElementById('app-root');

render(
  <Router history={hashHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={NewsList}></IndexRoute>
      <Route path="/:pageNumber" component={NewsList} />
    </Route>
  </Router>
, target);