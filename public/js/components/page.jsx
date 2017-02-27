import React, { Component } from 'react';
import { hashHistory } from 'react-router';

class Page extends Component {

  handlePageChange(page) {
    hashHistory.push(`/app/${page}`)
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