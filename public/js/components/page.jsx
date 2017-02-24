import React, { Component } from 'react';
import * as NewsActions from '../actions/news-actions.js';

class Page extends Component {
  
  handlePageChange(page) {
    NewsActions.changePage(page);
  }

  render() {

    const { page, isActive } = this.props;
    const className = isActive 
      ? 'news-pagination__page--active'
      : ''

    return (
      <li className={`news-pagination__page ${className}`}
          onClick={this.handlePageChange.bind(this, page)}>{page}
      </li>
    );
  }
}

export default Page;