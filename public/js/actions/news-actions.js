import types from '../actions/types';
import $ from 'jquery';

const getHeaders = () => {
  return {
    'Authorization': localStorage.getItem('jwt-token'),
  };
};

export const changePage = (page) => {
  return {
    type: types.PAGE_CHANGE,
    payload: page,
  };
};

export const fetchNewsCount = (searchQuery) => {
  const request = $.ajax({
    url: `/news/count?q=${searchQuery}`,
    method: 'GET',
    headers: getHeaders(),
  });

  return {
    type: types.FETCH_NEWS_COUNT,
    payload: request,
  };
}

export const fetchNewsForPage = ({ page, perPage, searchQuery }) => {
  const request =  $.ajax({
    url: `/news/${page}/${perPage}/?q=${searchQuery}`,
    method: 'GET',
    headers: getHeaders(),
});

  return {
    type: types.FETCH_NEWS_FOR_PAGE,
    payload: request,
  };
}

export const changeSearchQuery = (query) => {
  return {
    type: types.SEARCH_QUERY_CHANGE,
    payload: query,
  };
};

export const deleteNews = (_id) => {
  const request = $.ajax({
    url: '/news/remove',
    method: 'POST',
    data: { _id },
    headers: getHeaders(),
})

  return {
    type: types.NEWS_DELETE,
    payload: request
  };
};

export const addNews = ({ title, content }) => {
  const request = $.ajax({
    url: '/news/save',
    method: 'POST',
    data: { title, content },
    headers: getHeaders(),
});

  return {
    type: types.ADD_NEWS,
    payload: request,
  };
};

export const editNewsRequest = (instance) => {
  return {
    type: types.EDIT_NEWS_REQUEST,
    payload: instance
  };
};

export const completeEditing = () => {
  return {
    type: types.EDITING_COMPLETE,
  };
};

export const updateNews = (instance) => {
  return {
    type: types.UPDATE_NEWS,
    payload: instance,
  };
};

export const hidePopup = () => {
  return {
    type: types.POPUP_CLOSE,
  };
};

