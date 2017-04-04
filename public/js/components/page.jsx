import React, { Component } from 'react';

const Page = (props) => {
  const { page, isActive } = props;
  let className = 'news-pagination__page ';

  className += isActive
    ? 'news-pagination__page--active'
    : ''

  return (
    <li className={className} onClick={props.onClick}>
      {page}
    </li>
  );
};

export default Page;