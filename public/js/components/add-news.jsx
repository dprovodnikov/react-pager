import React, { Component } from 'react';
import * as NewsActions from '../actions/news-actions.js';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class AddNews extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      formTitle: 'Add new task',
      instance: {
        title: '',
        content: '',
        _id: null,
      },
    };
  }

  onSave(event) {
    if (this.state.instance._id) {
      this.props.updateNews(this.state.instance);
    } else {
      this.props.addNews(this.state.instance);
    }

    const nextState = Object.assign({}, this.state, {
      instance: {},
      formTitle: 'Add new task',
      show: false,
    });

    this.setState(nextState);
    this.props.completeEditing();

    event.preventDefault();
  }

  onInput({ target: { name, value } }) {
    const instance = Object.assign({}, this.state.instance, {
      [name]: value,
    });

    this.setState(Object.assign({}, this.state, { instance }));
  }

  showForm() {
    const nextState = Object.assign({}, this.state, {
      show: true
    });

    this.setState(nextState);
  }

  hideForm() {
    const nextState = Object.assign({}, this.state, {
      show: false,
      instance: {},
      formTitle: 'Add new task',
    });

    this.setState(nextState);
    this.props.completeEditing();
  }

  renderForm() {
    const { _id, title, content } = this.state.instance;

    return (this.state.show)
      ? <div>
          <div className="overlay" onClick={() => this.hideForm()}></div>
          <form className="add-news">
            <h2 className="add-news__heading">{this.state.formTitle}</h2>

            <input
              type="hidden"
              name="_id"
              defaultValue={_id}
              onChange={event => this.onInput(event)}
            />

            <input
              className="add-news__title"
              name="title"
              placeholder="Title"
              defaultValue={title}
              onChange={event => this.onInput(event)}
            />

            <textarea
              className="add-news__content"
              name="content"
              placeholder="Content"
              defaultValue={content}
              onChange={event => this.onInput(event)}
            ></textarea>

            <button className="add-news__btn" onClick={event => this.onSave(event)}>Save</button>
          </form>
        </div>
      : null
  }

  render() {
    return (
      <div>
        {this.renderForm()}
        <button className="new-news-btn" onClick={() => this.showForm()}>
          <i className="ion-android-add"></i>
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    updateNews: NewsActions.updateNews,
    addNews: NewsActions.addNews,
    completeEditing: NewsActions.completeEditing,
  }, dispatch);
};

export default connect(null, mapDispatchToProps)(AddNews);