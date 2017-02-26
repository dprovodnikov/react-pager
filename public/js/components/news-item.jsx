import React, { Component } from 'react';
import * as NewsActions from '../actions/news-actions.js';

class NewsItem extends Component {
  handleNewsDelete(_id) {
    NewsActions.deleteNews(_id);
  }

  render() {
    const { item } = this.props;

    return (
      <div className="news-item">
        <header className="news-item__header">
          <h2 className="news-item__title">{item.title}</h2>
          <i className="ion-trash-b" onClick={this.handleNewsDelete.bind(this, item._id)}></i>
        </header>
        <div className="news-item__content">{item.content}</div>
      </div>
    );
  }
}

export default NewsItem;