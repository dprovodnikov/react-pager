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