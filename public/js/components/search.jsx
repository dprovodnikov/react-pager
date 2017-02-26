import React, { Component } from 'react';
import * as NewsActions from '../actions/news-actions.js';

class Search extends Component {
  
  handleInput() {
    let { value } = this.refs.q;
    NewsActions.changeSearchQuery(value);
  }

  render() {
    return (
      <div className="app-header__search">
        <i className="ion-ios-search-strong"></i>
        <input ref="q" placeholder="Search..." onInput={this.handleInput.bind(this)}/>
      </div>
    );
  }
}

export default Search;