import React, { Component } from 'react';
import NewsStore from '../stores/news-store.js';

class Popup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      popup: {},
      timer: null,
    }
  }

  componentWillMount() {
    NewsStore.on('change', this.updateState.bind(this));
  }

  componentWillUnmount() {
    NewsStore.removeEventListener('change', this.updateState.bind(this));
  }

  updateState() {
    let status = NewsStore.getStatus();

    if (!status) return false;

    let state = this.state;

    state.status = status;
    state.show = true;
    state.popup = (status === 'success')
      ? { icon: 'ion-checkmark-circled', message: 'News were successfully deleted' }
      : { icon: 'ion-close-circled', message: 'Something went wrong, try again later' }

    if (state.timer) {
      clearTimeout(state.timer);
    }

    state.timer = setTimeout(() => {
      state.show = false;
      this.setState(state);
    }, this.props.duration || 3000);

    this.setState(state);
  }

  hidePopup() {
    this.state.show = false;
    this.setState(this.state);
  }

  render() {

    let { show, popup, status } = this.state;

    return (
      show 
      ? <div className={`notif-popup notif-popup--${status}`}>
          <div className="notif-popup__status">{status}</div>
          <div className="notif-popup__message">{popup.message}</div>
          <i className={popup.icon}></i>
          <button className="notif-popup__btn" onClick={this.hidePopup.bind(this)}>Got<u> it</u></button>
        </div>
      : null

    );
  }
}

export default Popup;