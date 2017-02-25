import React, { Component } from 'react';

class PageMobile extends Component {
  render() {
    const { total, currentPage } = this.props;
    return (
      <div className="news-pagination__mobile">
         {currentPage} of {total}
      </div>
    );
  }
}

export default PageMobile;