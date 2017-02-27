import dispatcher from '../dispatcher';

export function changePage(page) {
  dispatcher.dispatch({
    type: 'PAGE_CHANGE',
    page,
  })
}

export function changeSearchQuery(query) {
  dispatcher.dispatch({
    type: 'SEARCH_QUERY_CHANGE',
    query,
  })
}

export function deleteNews(_id) {
  dispatcher.dispatch({
    type: 'NEWS_DELETE',
    _id,
  });
}

export function addNews(instance) {
  dispatcher.dispatch({
    type: 'ADD_NEWS',
    instance
  });
}

export function editNewsRequest(instance) {
  dispatcher.dispatch({
    type: 'EDIT_NEWS_REQUEST',
    instance
  })
}

export function updateNews(instance) {
  dispatcher.dispatch({
    type: 'UPDATE_NEWS',
    instance
  })
}

export function hidePopup() {
  dispatcher.dispatch({ type: 'POPUP_CLOSE' })
}

