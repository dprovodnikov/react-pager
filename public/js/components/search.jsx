import React, { Component } from 'react';
import { changeSearchQuery } from '../actions/news-actions.js';
import { connect } from 'react-redux';

class Search extends Component {
  handleInput({ target }) {
    const term = target.value.toLowerCase();
    this.props.changeSearchQuery(term);
  }

  render() {
    return (
      <div className="app-header__search">
        <i className="ion-ios-search-strong"></i>
        <input name="term" placeholder="Search..." onInput={event => this.handleInput(event)}/>
      </div>
    );
  }
}

export default connect(null, { changeSearchQuery })(Search);