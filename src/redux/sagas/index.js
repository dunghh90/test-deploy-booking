import { fork } from 'redux-saga/effects';
import userSaga from './user.saga';
import tourSaga from './tour.saga';
import hotelSaga  from './hotel.saga';
import bookingSaga from './bookingTour.saga';
import  cartSaga from './bookingHotel.saga';
import  commentSaga from './comment.saga';

export default function* mySaga() {
  yield fork(userSaga);
  yield fork(tourSaga);
  yield fork(hotelSaga);
  yield fork(bookingSaga);
  yield fork(cartSaga);
  yield fork(commentSaga);
}