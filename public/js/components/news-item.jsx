import React, { Component } from 'react';
import * as NewsActions from '../actions/news-actions.js';

class NewsItem extends Component {
  constructor(props) {
    super(props);
  }

  handleNewsDelete(_id) {
    NewsActions.deleteNews(_id);
  }

  handleNewsEditRequest(item) {
    NewsActions.editNewsRequest(item);
  }

  render() {
    const { item } = this.props;
    const { isAdmin } = this.props.user;

    return (
      <div className="news-item">
        <header className="news-item__header">
          <h2 className="news-item__title">{item.title}</h2>
            { isAdmin ? 
              <div>
                <i className="ion-edit" onClick={this.handleNewsEditRequest.bind(this, item)}></i>
                <i className="ion-trash-b" onClick={this.handleNewsDelete.bind(this, item._id)}></i>
              </div> : null
             }
        </header>
        <div className="news-item__content">{item.content}</div>
      </div>
    );
  }
}

export default NewsItem;