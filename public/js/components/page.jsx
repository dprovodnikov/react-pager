import React, { Component } from 'react';

class Page extends Component {
  render() {

    const { page, isActive } = this.props;
    const className = isActive 
      ? 'news-pagination__page--active'
      : ''

    return (
      <li className={`news-pagination__page ${className}`}>{page}</li>
    );
  }
}

export default Page;