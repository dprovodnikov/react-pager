import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import App from './components/app.jsx';
import NewsList from './components/news-list.jsx';
import AuthForm from './components/auth-form.jsx';
import Layout from './components/layout.jsx';
import UserStore from './stores/user-store.js';

import Styles from '../stylus/index.styl'

const target = document.getElementById('app-root');

function isAuthorized() {
  const isAuth = UserStore.isAuthorized();
  hashHistory.push(isAuth ? '/app' : '/login')
}

render(
  <Router history={hashHistory}>
    <Route path="/" onEnter={isAuthorized()} component={Layout}>
      <IndexRoute component={AuthForm}></IndexRoute>
      <Route onEnter={isAuthorized()} path="login" component={AuthForm}></Route>
      <Route path="app" component={App}>
        <IndexRoute component={NewsList}></IndexRoute>
        <Route onEnter={isAuthorized()} path=":pageNumber" component={NewsList} />
      </Route>
    </Route>
  </Router>
, target);