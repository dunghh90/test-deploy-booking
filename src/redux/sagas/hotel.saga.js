import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* getLocationListSaga(action) {
  try {
    const { page,limit,more } = action.payload;
    const result = yield axios({
      method: 'GET',
      url: 'http://localhost:3002/locations',
      params:{
        _page: page,
        _limit: limit,
        ...more && {more: more},
      }
      
    });
    yield put({
      type: "GET_LOCATION_LIST_SUCCESS",
      payload: {
        data: result.data,
        more,
        page
      },
    });
  } catch (e) {
    yield put({
      type: "GET_LOCATION_LIST_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

function* getListHotelSaga(action) {

  try {
    const { id,more,page,limit,rate,address } = action.payload;
    const result = yield axios({
      method: 'GET',
      url: 'http://localhost:3002/hotels',
      params: {
        _page: page,
        _limit: limit,
        ...address && {q:address},
        ...id && { locationId: id },
        ...rate && { rate },
      }
    });
    
    yield put({
      type: "GET_LIST_HOTEL_SUCCESS",
      payload: {
        data: result.data,
        more,
        page
      },
    });
  } catch (e) {
    yield put({type: "GET_LIST_HOTEL_FAIL", message: e.message});
  }
}

function* getListRoomSaga(action) {
  
  // Chỗ này e phải lấy data của hotel chứ
  // Do e đặt tên bảng lojn xộn nên gây nhầm lẫn
  
  try {
    const { id } = action.payload;
    const result = yield axios({
      method: 'GET',
      url: `http://localhost:3002/hotels/${id}?_embed=rooms&_embed=bookingHotels&_expand=location`,
      
    });
    
    yield put({
      type: "GET_LIST_ROOM_SUCCESS",
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({type: "GET_LIST_ROOM_FAIL", message: e.message});
  }
}



export default function* hotelSaga() {
  yield takeEvery('GET_LOCATION_LIST_REQUEST', getLocationListSaga);
  yield takeEvery('GET_LIST_HOTEL_REQUEST', getListHotelSaga);
  yield takeEvery('GET_LIST_ROOM_REQUEST', getListRoomSaga);
}
