const initialState = {
  bookingTours: {
    data: [],
    load: false,
    error: '',
  },
};

export default function bookingTourReducer(state = initialState, action) {
  switch (action.type) {
    case 'BOOKING_TOUR_REQUEST': {
      const { carts } = action.payload;
      return {
        ...state,
        bookingTours: {
          ...state.bookingTours,
          data: carts,
          load: false,
        },
      }
    }
    case 'GET_BOOKING_TOUR_REQUEST': {
      const cartList = JSON.parse(localStorage.getItem('carts'));
      return {
        ...state,
        bookingTours: {
          ...state.bookingTours,
          data: cartList,
          load: false,
        },
      }
    }

    case 'GET_BOOKING_TOUR_SUCCESS': {
      const { data } = action.payload;
      return {
        ...state,
        bookingTours: {
          ...state.bookingTours,
          data: data,
          load: false,
        },
      }
    }
    case 'GET_BOOKING_TOUR_FAIL': {
      const { error } = action.payload;
      return {
        ...state,
        bookingTours: {
          ...state.bookingTours,
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
