import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import * as UserActions from '../actions/user-actions';
import UserStore from '../stores/user-store';

class AuthForm extends Component {
  constructor() {
    super();

    this.state = {
      registration: false,
    }
  }

  componentWillMount() {
    UserStore.on('change', this.updateState.bind(this));
  }

  componentWillUnmount() {
    UserStore.removeListener('change', this.updateState.bind(this));
  }

  updateState() {
    const isAuthorized = UserStore.isAuthorized();
    if (isAuthorized) {
      hashHistory.push('/app');
    }
  }

  execute() {
    let [ username, password ] = [
      this.refs.username.value,
      this.refs.password.value
    ]
    
    if (this.state.regisrtation) {
      UserActions.registrate({ username, password });
    } else {
      UserActions.authorizate({ username, password });
    }

    this.refs.username.value = '';
    this.refs.password.value = '';
  }

  changeMode() {
    this.state.regisrtation = !this.state.regisrtation;
    this.setState(this.state);
  }

  render() {

    const linkMessage = (this.state.regisrtation)
      ? 'Already have an account?'
      : 'Don\'t have an account?'

    const titleMessage = (this.state.regisrtation)
      ? 'registration'
      : 'authorization'

    return (
      <form className="auth-form">
        <h1 className="auth-form__title">{titleMessage}</h1>
        <input type="text" className="auth-form__input" ref="username" placeholder="Username"/>
        <input type="password" className="auth-form__input" ref="password" placeholder="Password"/>
        <button className="auth-form__btn" onClick={this.execute.bind(this)}>Done</button>
        <a href="#" className="auth-form__link" onClick={this.changeMode.bind(this)}>{linkMessage}</a>
      </form>
    );
  }
}

export default AuthForm;
