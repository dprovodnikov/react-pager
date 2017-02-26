import { EventEmitter } from 'events';
import dispatcher from '../dispatcher';
import $ from 'jquery'

class NewsStore extends EventEmitter {
  constructor() {
    super();
    this.currentPage = 1;
    this.perPage = 15;
    this.newsCount = 0;
    this.news = [];
    this.loading = false;
    this.pagesRange = 2;
    this.searchQuery = '';
  }

  loadNewsCount() {
    $.get(`/news/count?q=${this.searchQuery}`)
      .done(data => {
        this.newsCount = data.count;
        this.emit('change');
      })
      .fail(err => {
        if (err) throw err;
      })
  }

  loadNewsForPage(page) {
    this.loading = true;
    return $.get(`/news/${page}/${this.perPage}/?q=${this.searchQuery}`);
  }

  changeSearchQuery(query) {
    this.searchQuery = query;
    this.loadNewsCount();
  }

  deleteNews(_id) {
    $.post('/news/remove', { _id })
      .done(affected => {
        this.loadNewsCount();
      })
      .fail(err => {
        if (err) throw err;
      })
  }

  getPagesCount() {
    return Math.ceil(this.newsCount / this.perPage) || 1;
  }

  getCurrentPage() {
    return this.currentPage;
  }

  getPagesRange() {
    return this.pagesRange;
  }

  getNews() {
    return this.news;
  }

  changePage(page = 1) {
    if (this.loading) return false;

    this.currentPage = page;
    this.loadNewsForPage(page)
      .done(data => {
        this.news = data.news;
        this.emit('change');
        this.loading = false;
      })
      .fail(err => {
        this.loading = false;
        if (err) throw err;
      });
  }
  
  handleActions(action) {
    switch (action.type) {
      case 'PAGE_CHANGE': this.changePage(action.page); break;
      case 'SEARCH_QUERY_CHANGE': this.changeSearchQuery(action.query); break;
      case 'NEWS_DELETE': this.deleteNews(action._id); break;
    }
  }

}

const newsStore = new NewsStore();

dispatcher.register(newsStore.handleActions.bind(newsStore));

export default newsStore;