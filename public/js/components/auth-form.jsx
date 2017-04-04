import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { registrate, authorizate } from '../actions/user-actions.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class AuthForm extends Component {
  constructor() {
    super();

    this.state = {
      registration: false,
    };
  }

  componentWillMount() {
    if (this.props.isAuthorized) {
      browserHistory.push('/app/1');
    }
  }

  handleSubmit(event) {
    const [ username, password ] = [
      this.refs.username.value.trim(),
      this.refs.password.value.trim(),
    ];

    if (this.refs.isAdmin) {
      var isAdmin = this.refs.isAdmin.checked;
    }

    const { registrate, authorizate } = this.props;

    if (this.state.registration) {
      registrate({ username, password, isAdmin });
    } else {
      authorizate({ username, password });
    }

    this.refs.username.value = '';
    this.refs.password.value = '';

    event.preventDefault();
  }

  changeMode() {
    this.setState(Object.assign({}, this.state, {
      registration: !this.state.registration
    }));
  }

  componentWillUpdate({ isAuthorized }) {
    if (isAuthorized) {
      browserHistory.push('/app/1');
    }
  }

  render() {
    const linkMessage = (this.state.registration)
      ? 'Already have an account?'
      : 'Don\'t have an account?'

    const titleMessage = (this.state.registration)
      ? 'registration'
      : 'authorization'

    return (
      <form className="auth-form">
        <h1 className="auth-form__title">{titleMessage}</h1>
        <input type="text" className="auth-form__input" ref="username" placeholder="Username"/>
        <input type="password" className="auth-form__input" ref="password" placeholder="Password"/>
        <button className="auth-form__btn" onClick={event => this.handleSubmit(event)}>Done</button>
        {
          this.state.registration
          ? <label className="auth-form__checkbox">
              <input type="checkbox" ref="isAdmin"/>
              Admin
            </label>
          : null
        }
        <a href="#" className="auth-form__link" onClick={() => this.changeMode()}>{linkMessage}</a>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return { isAuthorized: state.user.isAuthorized };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ registrate, authorizate }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);
