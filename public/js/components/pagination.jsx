import React, { Component } from 'react';
import Page from './page.jsx';
import { range } from '../utils/range.js';
import { hashHistory } from 'react-router';

class Pagination extends Component {

  hasPrev(current) {
    return current > 1;
  } 

  hasNext(current) {
    return current < this.props.pagesCount;
  }

  increasePage(current) {
    if (this.hasNext(current)) {
      hashHistory.push(`/${+current + 1}`);
    }
  }

  decreasePage(current) {
    if (this.hasPrev(current)) {
      hashHistory.push(`/${+current - 1}`);
    }
  }

  render() {

    const { currentPage = 1, pagesCount } = this.props;

    const pages = range(pagesCount).map((page, i) => {
      return <Page key={page} page={page+1} isActive={ currentPage == i + 1} />
    });

    const prevButton = (
      currentPage > 1
      ? <li className="news-pagination__arrow" onClick={this.decreasePage.bind(this, currentPage)}>
          <i className="ion-chevron-left"></i>
        </li>
      : null
    );

    const nextButton = (
      currentPage < pagesCount
      ? <li className="news-pagination__arrow" onClick={this.increasePage.bind(this, currentPage)}>
          <i className="ion-chevron-right"></i>
        </li>
      : null
    );

    return (
      <div className="news-pagination">
        <ul className="news-pagination__list">
          {prevButton}
          {pages}
          {nextButton}
        </ul>
      </div>
    );
  }
}

export default Pagination;