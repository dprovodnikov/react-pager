import React, { Component } from 'react';
import * as NewsActions from '../actions/news-actions.js';
import NewsStore from '../stores/news-store.js';

class AddNews extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      title: 'Add new task',
      instance: {},
    }
  }

  componentWillMount() {
    NewsStore.on('change', this.updateState.bind(this));
  }

  componentWillUnmount() {
    NewsStore.removeEventListener('change', this.updateState.bind(this));
  }

  updateState() {
    const editingInfo = NewsStore.isEditing()

    if (!editingInfo) return false;

    const { instance } = editingInfo;

    this.state.show = true;
    this.state.title = 'Update task'
    this.state.instance = instance;
    this.setState(this.state);
  }

  handleSave() {
    const [ title, content, _id ] = [
      this.refs.title.value,
      this.refs.content.value,
      this.refs.id.value
    ];

    if (!title.trim() || !content.trim()) {
      return false;
    }
    
    if (_id) {
      NewsActions.updateNews({ title, content, _id });
    } else {
      NewsActions.addNews({ title, content });
    }

    this.state.instance = {};
    this.state.title = 'Add new task';
    this.state.show = false;
    this.setState(this.state);
  }

  showForm() {
    this.state.show = true;
    this.setState(this.state);
  }

  hideForm() {
    this.state.show = false;
    this.state.instance = {};
    this.state.title = 'Add new task';
    this.setState(this.state);
  }

  renderForm() {
    const { _id, title, content } = this.state.instance;

    return (this.state.show)
      ? <div>
          <div className="overlay" onClick={this.hideForm.bind(this)}></div>
          <form className="add-news">
            <h2 className="add-news__heading">{this.state.title}</h2>
            <input type="hidden" ref="id" defaultValue={_id}/>
            <input className="add-news__title" ref="title" placeholder="Title" defaultValue={title}/>
            <textarea className="add-news__content" ref="content" placeholder="Content" defaultValue={content}></textarea>
            <button className="add-news__btn" onClick={this.handleSave.bind(this)}>Save</button>
          </form>
        </div>
      : null
  }

  render() {
    return (
      <div>
        {this.renderForm()}
        <button className="new-news-btn" onClick={this.showForm.bind(this)}>
          <i className="ion-android-add"></i>
        </button>
      </div>
    );
  }
}

export default AddNews;