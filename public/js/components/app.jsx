import React, { Component } from 'react';
import Search from './search.jsx';
// import Popup from './popup.jsx';
// import AddNews from './add-news.jsx';
import { logout } from '../actions/user-actions.js';
import { browserHistory } from 'react-router';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Layout extends Component {

  handleLogout() {
    this.props.logout();
  }

  render() {
    return (
      <div>

        <header className="app-header">
          <div className="app-container">
            <div className="app-header__title">
             <span className="main-color">ReactJS</span>&nbsp;pager
            </div>
            <Search />
            <button className="app-header__btn" onClick={() => this.handleLogout()}>
              <i className="ion-log-out"></i>
            </button>
          </div>
        </header>

        <section className="app-content">
          <div className="app-container">
            {this.props.children}
          </div>
        </section>

      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ logout }, dispatch);
}

export default connect(null, mapDispatchToProps)(Layout);