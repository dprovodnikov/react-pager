import React, { Component } from 'react';
import NewsItem from './news-item.jsx';
import Pagination from './pagination.jsx';
import NewsStore from '../stores/news-store.js';

class NewsList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentPage: NewsStore.getCurrentPage(),
      pagesCount: 0,
      news: [],
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
  }


  render() {

    const { currentPage, pagesCount, news } = this.state;

    const newsList = news.map(newsItem => {
      return <NewsItem key={newsItem._id} item={newsItem} />
    });

    return (
      <div>
        <div className="news-list">
          {newsList}
        </div>
        <Pagination currentPage={currentPage} pagesCount={pagesCount} />
      </div>
    );
  }
}

export default NewsList;