import { combineReducers } from 'redux';
import tourReducer from './tour.reducer';
import hotelReducer from'./hotel.reducer'
import userReducer from './user.reducer';
import bookingTourReducer from './bookingTour.reducer';
import bookingHotelReducer from './bookingHotel.reducer';
import commentReducer from './comment.reducer';



export default combineReducers({
  tourReducer,
  userReducer,
  hotelReducer,
  bookingHotelReducer,
  bookingTourReducer,
  commentReducer

})
