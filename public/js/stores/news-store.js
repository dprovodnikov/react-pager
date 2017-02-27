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
    this.status = {
      status: null,
      message: null
    };
    this.editing = {}
  }

  loadNewsCount() {
    $.get(`/news/count?q=${this.searchQuery}`)
      .done(data => {
        this.newsCount = data.count;
        this.emit('change');
      })
      .fail(err => {
        if (err) throw err
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
        this.setStatusSuccess('News were successfuly deleted');
      })
      .fail(err => {
        if (err) throw err;
        this.setStatusError('An error occured while deleting the task');
      })
  }

  getPagesCount() { return Math.ceil(this.newsCount / this.perPage) || 1 }
  getCurrentPage() { return this.currentPage }
  getPagesRange() { return this.pagesRange }
  getNews() { return this.news }
  getNewsCount() { return this.newsCount }
  getStatus() { return this.status }

  isEditing() {
    return this.editing.status
      ? this.editing
      : false
  }

  completeEditing() {
    this.editing = {}
  }

  initEditing(instance) {
    this.editing = { status: true, instance }
    this.emit('change');
  }

  setStatusSuccess(message) {
    this.status = { status: 'success', message }
  }

  setStatusError(message) {
    this.status = { status: 'error', message }
  }

  resetStatus() {
    this.status = { status: null, message: null };
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
        if (err) throw err
      });
  }

  addNews(instance) {
    const { title, content } = instance;

    if (!title.trim() || !content.trim()) {
      return false;
    }

    $.post('/news/save', { title, content })
      .done(response => {
        this.loadNewsCount();
        this.setStatusSuccess('News were successfuly added');
      })
      .fail(err => {
        this.setStatusError('An error occured while saving the task');
        throw err;
      });
  }


  updateNews(instance) {
    const { _id, title, content } = instance;

    $.post('/news/update', { _id, title, content })
      .done(response => {
        this.loadNewsCount();
        this.setStatusSuccess('The task were updated successfuly');
      })
      .fail(err => {
        this.setStatusError('An error occured while updating the task');
        throw err;
      })

    this.completeEditing();
  }
  
  handleActions(action) {
    switch (action.type) {
      case 'PAGE_CHANGE': this.changePage(action.page); break;
      case 'SEARCH_QUERY_CHANGE': this.changeSearchQuery(action.query); break;
      case 'NEWS_DELETE': this.deleteNews(action._id); break;
      case 'ADD_NEWS': this.addNews(action.instance); break;
      case 'EDIT_NEWS_REQUEST': this.initEditing(action.instance); break;
      case 'EDITING_COMPLETE': this.completeEditing(); break;
      case 'UPDATE_NEWS': this.updateNews(action.instance); break;
      case 'POPUP_CLOSE': this.resetStatus(); break;
    }
  }

}

const newsStore = new NewsStore();

dispatcher.register(newsStore.handleActions.bind(newsStore));

export default newsStore;