import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import NewsItem from './news-item.jsx';
import Pagination from './pagination.jsx';
import NewsStore from '../stores/news-store.js';
import UserStore from '../stores/user-store.js';
import { loadUser } from '../actions/user-actions.js';
import { hashHistory } from 'react-router';
import $ from 'jquery';

class NewsList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentPage: props.params.pageNumber,
      pagesCount: NewsStore.getPagesCount(),
      news: NewsStore.getNews(),
      pagesRange: NewsStore.getPagesRange(),
      user: UserStore.getUser(),
    }
  }

  componentWillMount() {
    NewsStore.on('change', this.updateState.bind(this));
    UserStore.on('change', this.updateState.bind(this));

    NewsStore.loadNewsCount();
    NewsStore.changePage(this.state.currentPage);
    loadUser();
  }

  componentWillUnmount() {
    NewsStore.removeAllListeners('change');
    UserStore.removeAllListeners('change');
  }

  updateState() {
    const { pageNumber } = this.props.params;
    const pagesCount = NewsStore.getPagesCount();
    const user = UserStore.getUser();

    if (pageNumber > pagesCount) {
      return hashHistory.push(`/app/${pagesCount}`);
    }

    this.setState({
      currentPage: NewsStore.getCurrentPage(),
      pagesCount: pagesCount,
      news: NewsStore.getNews(),
      user,
    });
  
    $('body').animate({'scrollTop': 0}, 50);
  }

  render() {
    const { pagesCount, pagesRange, news, user } = this.state;
    const { pageNumber:currentPage = NewsStore.getCurrentPage() } = this.props.params;
    const totalNewsCount = NewsStore.getNewsCount();

    const newsList = news.map(newsItem => {
      return <NewsItem key={newsItem._id} item={newsItem} user={user}/>
    });

    const transitionOptions = {
      transitionName: 'news',
      transitionEnterTimeout: 200,
      transitionLeaveTimeout: 200,
    }

    const titleContent = (news.length <= 0)
      ? 'No news for now. Try later'
      : `${news.length} of ${totalNewsCount} on the page`

    return (
      <span>
        <div className="news-list">
          <div className="news-list__title">{titleContent}</div>
          <ReactCSSTransitionGroup {...transitionOptions}>
            {newsList}
          </ReactCSSTransitionGroup>
        </div>
        <Pagination currentPage={currentPage} pagesCount={pagesCount} pagesRange={pagesRange}/>
      </span>
    );
  }
}

export default NewsList;