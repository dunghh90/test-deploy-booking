// import {
//   GET_PRODUCT_LIST,
// } from '../constants';

export function getTourListAction(params) {
  return {
    type: 'GET_TOUR_LIST_REQUEST',
    payload: params,
  }
}


export function getTourDetailAction(params) {
  return {
    type: 'GET_TOUR_DETAIL_REQUEST',
    payload: params,
  }
}

export function getTopicTourListAction(params) {
  return {
    type: 'GET_TOPIC_TOUR_LIST_REQUEST',
    payload: params,
  }
}


