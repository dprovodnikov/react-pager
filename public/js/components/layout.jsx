import React, { Component } from 'react';
import Search from './search.jsx';
import Popup from './popup.jsx';

class Layout extends Component {
  render() {
    const transitionOptions = {
      transitionName: 'popup',
      transitionEnterTimeout: 200,
      transitionLeaveTimeout: 200,
    };

    return (
      <div>
        <Popup duration="2000"/>
        <header className="app-header">
          <div className="app-container">
            <div className="app-header__title">
             <span className="main-color">ReactJS</span>&nbsp;pager
            </div>
            <Search />
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