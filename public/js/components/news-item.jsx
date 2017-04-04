import React, { Component } from 'react';

class NewsItem extends Component {
  handleNewsDelete(_id) {
    console.log(`delete ${_id}`);
  }

  handleNewsEditRequest(item) {
    console.log(`update ${item}`);
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
                <i className="ion-edit" onClick={() => this.handleNewsEditRequest(item)}></i>
                <i className="ion-trash-b" onClick={() => this.handleNewsDelete(item._id)}></i>
              </div> : null
             }
        </header>
        <div className="news-item__content">{item.content}</div>
      </div>
    );
  }
}

export default NewsItem;