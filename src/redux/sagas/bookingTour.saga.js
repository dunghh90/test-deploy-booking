import { put, takeEvery } from 'redux-saga/effects';
import { notification } from 'antd';
import axios from 'axios';

function* bookingTour(action) {
  try {
    const { userId, tourId, startDate, numberAdults, numberChild, totalPrice } = action.payload;
    const result = yield axios({
      method: 'POST',
      url: 'https://json-server-demo-tour.herokuapp.com/api/bookingTours',
      data: {
        userId,
        tourId,
        startDate,
        numberAdults,
        numberChild,
        totalPrice
      }
    });
    yield notification.open({
      message: 'Đặt tour thành công',
      description: `Bạn đã đặt tour ngày ${startDate}`,
    });
    yield put({
      type: "GET_TOUR_DETAIL_REQUEST",
      payload: {
        id: tourId
      }
    })
    yield put({
      type: "BOOKING_TOUR_SUCCESS",
      data: result.data.data,
      payload: {
      },
    });
  } catch (e) {
    yield put({
      type: "BOOKING_TOUR_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

function* getBookingTours(action) {
  try {
    const { userId, page, limit } = action.payload;
    const result = yield axios({
      method: 'GET',
      url: 'https://json-server-demo-tour.herokuapp.com/api/bookingTours',
      params:{
        _page: page,
        _limit: limit,
        _expand:"tour",
        userId
      }
    });
    yield put({
      type: "GET_BOOKING_TOUR_SUCCESS",
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: "GET_BOOKING_TOUR_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}
export default function* cartSaga() {
  yield takeEvery('BOOKING_TOUR_REQUEST', bookingTour);
  yield takeEvery('GET_BOOKING_TOUR_REQUEST', getBookingTours);
  
}
