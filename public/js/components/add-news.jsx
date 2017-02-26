import React, { Component } from 'react';
import * as NewsActions from '../actions/news-actions.js';

class AddNews extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
    }
  }

  handleSave() {
    const [ title, content ] = [
      this.refs.title.value,
      this.refs.content.value
    ];

    if (!title.trim() || !content.trim()) {
      return false;
    }

    NewsActions.addNews({ title, content });

    this.state.show = false;
    this.setState(this.state);
  }

  showForm() {
    this.state.show = true;
    this.setState(this.state);
  }

  hideForm() {
    this.state.show = false;
    this.setState(this.state);
  }

  renderForm() {
    return (this.state.show)
      ? <div>
          <div className="overlay" onClick={this.hideForm.bind(this)}></div>
          <form className="add-news">
            <h2 className="add-news__heading">Add a new task</h2>
            <input className="add-news__title" ref="title" placeholder="Title"/>
            <textarea className="add-news__content" ref="content" placeholder="Content"></textarea>
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