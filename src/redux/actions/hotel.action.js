export function getLocationListAction(params) {
    console.log("🚀 ~ file: hotel.action.js ~ line 2 ~ getLocationListAction ~ params", params)
    return {
      type: 'GET_LOCATION_LIST_REQUEST',
      payload: params,
    }
  }
  export function getListHotelAction(params) {
    return {
      type: 'GET_LIST_HOTEL_REQUEST',
      payload: params,
    }
  }

  export function getListRoomAction(params) {
    return {
      type: 'GET_LIST_ROOM_REQUEST',
      payload: params,
    }
  }

  export function getRateListAction(params) {
    return {
      type: 'GET_RATE_LIST_REQUEST',
      payload: params,
    }
  }
  export function getAddressListAction(params) {
    return {
      type: 'GET_ADDRESS_LIST_REQUEST',
      payload: params,
    }
  }
