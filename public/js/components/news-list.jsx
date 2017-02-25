import React, { Component } from 'react';
import NewsItem from './news-item.jsx';
import Pagination from './pagination.jsx';
import NewsStore from '../stores/news-store.js';
import $ from 'jquery';

import { hashHistory } from 'react-router';

class NewsList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentPage: props.params.pageNumber,
      pagesCount: NewsStore.getPagesCount(),
      news: NewsStore.getNews(),
      pagesRange: NewsStore.getPagesRange()
    }
  }

  componentWillMount() {
    NewsStore.on('change', this.updateState.bind(this));

    NewsStore.loadNewsCount();
    NewsStore.changePage(this.state.currentPage);
  }

  componentWillUnmount() {
    NewsStore.removeListener('change', this.updateState.bind(this));
  }

  updateState() {
    this.setState({
      currentPage: NewsStore.getCurrentPage(),
      pagesCount: NewsStore.getPagesCount(),
      news: NewsStore.getNews(),
    });
  
    $('body').animate({'scrollTop': 0}, 50);
  }

  render() {
    const { pagesCount, pagesRange, news } = this.state;
    const { pageNumber:currentPage = NewsStore.getCurrentPage() } = this.props.params;

    const newsList = news.map(newsItem => {
      return <NewsItem key={newsItem._id} item={newsItem} />
    });

    return (
      <div>
        <div className="news-list">
          {newsList}
        </div>
        <Pagination currentPage={currentPage} pagesCount={pagesCount} pagesRange={pagesRange}/>
      </div>
    );
  }
}

export default NewsList;