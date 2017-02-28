import { EventEmitter } from 'events';
import dispatcher from '../dispatcher';
import $ from 'jquery'
import types from '../actions/types';

class UserStore extends EventEmitter {
  constructor() {
    super();

    this.user ={
      _id: null,
      isAdmin: false,
    }
  }

  isAdmin() {
    return this.user.isAdmin;
  }

  getUser() {
    return this.user;
  }

  register({ username = '', password = '' }) {
    if (!username.trim() || !password.trim()) {
      return false;
    }

    $.post('/user/signup', { username, password })
      .done(user => {
        // show popup or something
        console.log('done');
      })
      .fail(err => {
        if (err) throw err;
      });
  }

  authorize({ username = '', password = '' }) {
    if (!username.trim() || !password.trim()) {
      return false;
    }

    $.post('/user/signin', { username, password })
      .done(response => {
        localStorage.setItem('jwt-token', response.token);

        // show popup or something
        
        this.user = {
          isAdmin: response.isAdmin,
          _id: response._id
        }

        this.emit('change');
      })
      .fail(err => {
        if (err) throw err;
      })
  } 

  loadUser() {
    $.post('/user/bytoken/', { token: localStorage.getItem('jwt-token') })
      .done(res => {
        this.user.isAdmin = res.isAdmin;
        this.user._id = res._id;
        this.emit('change');
      })
      .fail(err => {
        if (err) throw err;
      })
  }

  logout() {
    localStorage.removeItem('jwt-token');
  }

  isAuthorized() {
    return localStorage.getItem('jwt-token') ? true : false
  }

  handleActions(action) {
    switch (action.type) {
      case types.REGISTER_USER: this.register(action.credentials); break;
      case types.AUTHORIZE_USER: this.authorize(action.credentials); break;
      case types.LOGOUT: this.logout(); break;
      case types.LOAD_USER: this.loadUser(); break;
    }
  }

}

const userStore = new UserStore();

dispatcher.register(userStore.handleActions.bind(userStore));

export default userStore;