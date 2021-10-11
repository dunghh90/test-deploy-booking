const initialState = {
    bookingHotels: {
      data: [],
      load: false,
      error: '',
    },
  };
  
  export default function bookingHotelReducer(state = initialState, action) {
    switch (action.type) {
      case 'BOOKING_HOTEL_ROOM_REQUEST': {
        return {
          ...state,
          bookingHotels: {
            ...state.bookingHotels,
            load: false,
          },
        }
      }
      case 'GET_BOOKING_HOTEL_REQUEST': {
        const { data } = action.payload;
        return {
          ...state,
          bookingHotels: {
            ...state.bookingHotels,
            data: data,
            load: false,
          },
        }
      }

      case 'GET_BOOKING_HOTEL_SUCCESS': {
        const { data } = action.payload;
        return {
          ...state,
          bookingHotels: {
            ...state.bookingHotels,
            data: data,
            load: false,
          },
        }
      }
      case 'GET_BOOKING_HOTEL_FAIL': {
        const { error } = action.payload;
        return {
          ...state,
          bookingHotels: {
            ...state.bookingHotels,
            load: false,
            error: error,
          },
        }
      }

      
      default: {
        return state;
      }
    }
  }

  