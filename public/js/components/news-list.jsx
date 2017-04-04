import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import NewsItem from './news-item.jsx';
import Pagination from './pagination.jsx';

import { fetchUser } from '../actions/user-actions.js';
import * as NewsActions from '../actions/news-actions.js';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { browserHistory } from 'react-router';
import $ from 'jquery';

class NewsList extends Component {
  componentWillMount() {
    const { searchQuery, currentPage, perPage } = this.props;

    this.props.fetchUser();
    this.props.fetchNewsCount(searchQuery);
    this.props.fetchNewsForPage({
      page: currentPage,
      searchQuery,
      perPage,
    });
  }

  getPagesCount() {
    const { perPage, total } = this.props;

    return Math.ceil(total / perPage);
  }

  componentWillUpdate(nextProps) {
    const { currentPage, params: { pageNumber } } = nextProps;

    const fetchNews = () => {
      nextProps.fetchNewsCount(nextProps.searchQuery)
      nextProps.fetchNewsForPage({
        page: pageNumber,
        searchQuery: nextProps.searchQuery,
        perPage: nextProps.perPage,
      });
    }

    if (currentPage != pageNumber) {
      nextProps.changePage(pageNumber);
      fetchNews();
    }

    if (!nextProps.user.isAuthorized) {
      browserHistory.push('/login');
    }

    if (nextProps.searchQuery != this.props.searchQuery) {
      fetchNews();
    }

    if (this.props.total != nextProps.total) {
      fetchNews();
    }
  }

  render() {
    const pagesCount = this.getPagesCount();
    const { currentPage, pagesRange, news, user, total } = this.props;

    const newsList = news.map(newsItem => {
      return (
        <NewsItem
          key={newsItem._id}
          item={newsItem}
          user={user}
          onDelete={this.props.deleteNews}
        />
      )
    });

    const transitionOptions = {
      transitionName: 'news',
      transitionEnterTimeout: 200,
      transitionLeaveTimeout: 200,
    }

    const titleContent = (news.length <= 0)
      ? 'No news for now. Try later'
      : `${news.length} of ${total} on the page`

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

const mapStateToProps = (state) => {
  return {
    currentPage: state.pages.currentPage,
    perPage: state.pages.perPage,
    pagesRange: state.pages.pagesRange,
    news: state.news.onPage,
    total: state.news.total,
    user: state.user,
    searchQuery: state.searchQuery,
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchNewsForPage: NewsActions.fetchNewsForPage,
    fetchNewsCount: NewsActions.fetchNewsCount,
    changePage: NewsActions.changePage,
    deleteNews: NewsActions.deleteNews,
    fetchUser,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsList);