import React, { Component } from 'react';
import NewsItem from './news-item.jsx';
import Pagination from './pagination.jsx';

class NewsList extends Component {
  render() {
    return (
      <div>
        <div className="news-list">
          <NewsItem />
          <NewsItem />
          <NewsItem />
        </div>
        <Pagination />
      </div>
    );
  }
}

export default NewsList;