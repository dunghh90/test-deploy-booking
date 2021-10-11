export function bookingHotelAction(params) {
  return {
    type: 'BOOKING_HOTEL_ROOM_REQUEST',
    payload: params,
  }
}

export function bookingTourAction(params) {
  return {
    type: 'BOOKING_TOUR_REQUEST',
    payload: params,
  }
}
export function getBookingTourAction(params) {
  return {
    type: 'GET_BOOKING_TOUR_REQUEST',
    payload: params,
  }
}
export function getBookingHotelsAction(params) {
  return {
    type: 'GET_BOOKING_HOTEL_REQUEST',
    payload: params,
  }
}


