import dispatcher from '../dispatcher';
import types from '../actions/types';

export function changePage(page) {
  dispatcher.dispatch({
    type: types.PAGE_CHANGE,
    page,
  })
}

export function changeSearchQuery(query) {
  dispatcher.dispatch({
    type: types.SEARCH_QUERY_CHANGE,
    query,
  });
}

export function deleteNews(_id) {
  dispatcher.dispatch({
    type: types.NEWS_DELETE,
    _id,
  });
}

export function addNews(instance) {
  dispatcher.dispatch({
    type: types.ADD_NEWS,
    instance
  });
}

export function editNewsRequest(instance) {
  dispatcher.dispatch({
    type: types.EDIT_NEWS_REQUEST,
    instance
  });
}

export function completeEditing() {
  dispatcher.dispatch({ type: types.EDITING_COMPLETE });
}

export function updateNews(instance) {
  dispatcher.dispatch({
    type: types.UPDATE_NEWS,
    instance
  });
}

export function hidePopup() {
  dispatcher.dispatch({ type: types.POPUP_CLOSE });
}

