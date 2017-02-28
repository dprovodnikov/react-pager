import React, { Component } from 'react';
import Search from './search.jsx';
import Popup from './popup.jsx';
import AddNews from './add-news.jsx';
import * as UserActions from '../actions/user-actions.js';
import { hashHistory } from 'react-router';

class Layout extends Component {
  
  handleLogout() {
    UserActions.logout();
    hashHistory.push('/login');
  }

  render() {
    return (
      <div>
        
        <AddNews />

        <Popup duration="2000"/>

        <header className="app-header">
          <div className="app-container">
            <div className="app-header__title">
             <span className="main-color">ReactJS</span>&nbsp;pager
            </div>
            <Search />
            <button className="app-header__btn" onClick={this.handleLogout}>
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

export default Layout;