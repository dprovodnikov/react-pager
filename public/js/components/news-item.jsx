import React, { Component } from 'react';

class NewsItem extends Component {
  render() {
    return (
      <div className="news-item">
        <header className="news-item__header">
          <h2 className="news-item__title">Lorem ipsum dolor sit.</h2>
          <i className="ion-trash-b"></i>
        </header>
        <div className="news-item__content">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt repellendus soluta autem, hic corporis!</div>
      </div>
    );
  }
}

export default NewsItem;