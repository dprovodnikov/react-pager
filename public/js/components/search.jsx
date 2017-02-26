import React, { Component } from 'react';
import NewsStore from '../stores/news-store.js';

class Search extends Component {
  
  handleInput() {
    let { value } = this.refs.q;
    NewsStore.setSearchQuery(value);
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