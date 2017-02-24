import dispatcher from '../dispatcher';

export function changePage(page) {
  dispatcher.dispatch({
    type: 'PAGE_CHANGE',
    page
  })
}