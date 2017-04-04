const isAuth = () => {
  return localStorage.getItem('jwt-token') ? true : false;
};

export const isAuthorized = (nextState, replace, cb) => {
  if (!isAuth()) {
    replace({
      pathname: '/login',
      state: {nextPathname: nextState.location.pathname}
    });
  }

  cb();
};

export const isLoggedOut = (nextState, replace, cb) => {
  if (isAuth()) {
    replace({
      pathname: '/app',
      state: {nextPathname: nextState.location.pathname}
    });
  }

  cb();
};
