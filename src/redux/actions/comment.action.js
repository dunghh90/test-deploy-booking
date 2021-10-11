export function getCommentAction(params) {
  return {
    type: 'GET_LIST_COMMENT_REQUEST',
    payload: params,
  }
}
export function addCommentAction(params) {
  console.log("🚀 ~ file: comment.action.js ~ line 8 ~ addCommentAction ~ params", params)
  return {
    type: 'ADD_COMMENT_REQUEST',
    payload: params,
  }
}
