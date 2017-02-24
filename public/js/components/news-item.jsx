import React, { Component } from 'react';

class NewsItem extends Component {
  render() {
  
    const { item } = this.props;

    return (
      <div className="news-item">
        <header className="news-item__header">
          <h2 className="news-item__title">{item.title}</h2>
          <i className="ion-trash-b"></i>
        </header>
        <div className="news-item__content">{item.content}</div>
      </div>
    );
  }
}

export default NewsItem;