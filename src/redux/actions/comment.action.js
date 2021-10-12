export function getCommentAction(params) {
  return {
    type: 'GET_LIST_COMMENT_REQUEST',
    payload: params,
  }
}
export function addCommentAction(params) {
  return {
    type: 'ADD_COMMENT_REQUEST',
    payload: params,
  }
}
