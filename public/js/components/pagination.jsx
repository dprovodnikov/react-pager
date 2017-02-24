import React, { Component } from 'react';
import Page from './page.jsx';
import { range } from '../utils/range.js';

class Pagination extends Component {
  render() {

    const { currentPage = 1, pagesCount } = this.props;

    const pages = range(pagesCount).map((page, i) => {
      return <Page key={page} page={page+1} isActive={ currentPage == i + 1} />
    });

    return (
      <div className="news-pagination">
        <ul className="news-pagination__list">
          {pages}
        </ul>
      </div>
    );
  }
}

export default Pagination;