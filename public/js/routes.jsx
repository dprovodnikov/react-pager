import React from 'react';
import { Route, IndexRoute } from 'react-router';
import AuthForm from './components/auth-form.jsx';
import Layout from './components/layout.jsx';
import App from './components/app.jsx';
import NewsList from './components/news-list.jsx';

import { isLoggedOut, isAuthorized } from './middlewares/auth-middlewares.js';

export default (
  <Route path="/" component={Layout}>
    <IndexRoute component={AuthForm}></IndexRoute>
    <Route path="login" onEnter={isLoggedOut} component={AuthForm}></Route>
    <Route path="app" onEnter={isAuthorized} component={App}>
      <IndexRoute component={NewsList}></IndexRoute>
      <Route path=":pageNumber" component={NewsList} />
    </Route>
  </Route>
)