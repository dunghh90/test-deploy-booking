import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* getTourListSaga(action) {
  try {
    const { page, limit, locationId, topicTourId } = action.payload;
    const result = yield axios({
      method: 'GET',
      url: `http://localhost:3002/tours?_page=${page}&_limit=${limit}&_expand=location&_expand=topicTour`,
      params: {
        // _page: page,
        // _limit: limit,
        // _expand: "location",
        // _expand: "topicTour",
        ...locationId && { locationId },
        ...topicTourId && { topicTourId }
        // ...catagoryId && { catagoryId },// categoryId: categoryId -> null, truyen Id khi ton taij'
        // ...searchkey && { q: searchkey },
        // _sort: 'price',
        // _order: 'dest',
      }
    });
    yield put({
      type: "GET_TOUR_LIST_SUCCESS",
      payload: {
        data: result.data
      },
    });
  } catch (e) {
    yield put({
      type: "GET_TOUR_LIST_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}
function* getTopicTourListSaga(action) {
  try {
    const result = yield axios({
      method: 'GET',
      url: 'http://localhost:3002/topicTours',
    });
    yield put({
      type: "GET_TOPIC_TOUR_LIST_SUCCESS",
      payload: {
        data: result.data
      },
    });
  } catch (e) {
    yield put({
      type: "GET_TOPIC_TOUR_LIST_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

function* getTourDetailSaga(action) {
  try {
    const { id } = action.payload;
    const result = yield axios({
      method: 'GET',
      url: `http://localhost:3002/tours/${id}`,
      params: {
        _expand: 'location',
        _embed: 'bookingTours'
      }
    });
    yield put({
      type: "GET_TOUR_DETAIL_SUCCESS",
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({type: "GET_TOUR_DETAIL_FAIL", message: e.message});
  }
}


export default function* tourSaga() {
  yield takeEvery('GET_TOUR_LIST_REQUEST', getTourListSaga);
  yield takeEvery('GET_TOPIC_TOUR_LIST_REQUEST', getTopicTourListSaga);
  yield takeEvery('GET_TOUR_DETAIL_REQUEST', getTourDetailSaga);
  
}