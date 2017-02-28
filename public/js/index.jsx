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

function isAuthorized(nextState, replace, cb) {
  const isAuth = UserStore.isAuthorized();

  if (!isAuth) {
    replace({
      pathname: '/login',
      state: {nextPathname: nextState.location.pathname}
    });
  }

  cb();
}

function isLoggedOut(nextState, replace, cb) {
  const isAuth = UserStore.isAuthorized();

  if (isAuth) {
    replace({
      pathname: '/app',
      state: {nextPathname: nextState.location.pathname}
    });
  }

  cb();
}

render(
  <Router history={hashHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={AuthForm}></IndexRoute>
      <Route path="login" onEnter={isLoggedOut} component={AuthForm}></Route>
      <Route path="app" onEnter={isAuthorized} component={App}>
        <IndexRoute component={NewsList}></IndexRoute>
        <Route path=":pageNumber" component={NewsList} />
      </Route>
    </Route>
  </Router>
, target);