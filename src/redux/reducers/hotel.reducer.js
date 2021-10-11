const initialState = {
    locationList: {
      data: [],
      load: false,
      error: '',
    },
    listHotel: {
      data: [],
      load: false,
      error: '',
    },
    listRoom: {
      data: {
        rooms: [],
        bookingHotels:[],
        src:[],
      },
      load: false,
      error: '',
    },
    // rateList:{
    //   data: [],
    //   load: false,
    //   error: '',
    // },
   
  };
  
  export default function hotelReducer(state = initialState, action) {
    switch (action.type) {
      
      
     
      
      case 'GET_LIST_HOTEL_REQUEST': {
        return {
          ...state,
          listHotel: {
            ...state.listHotel,
            load: true,
          },
        }
      }
      case 'GET_LIST_HOTEL_SUCCESS': {
        
       const { data, page, more } = action.payload;
        if (more) {
          return {
            ...state,
            listHotel: {
              ...state.listHotel,
              data: [
                ...state.listHotel.data,
                ...data,
              ],
              page: page,
              load: false,
            },
          }
        } else {
          return {
            ...state,
            listHotel: {
              ...state.listHotel,
              data: data,
              page: page,
              load: false,
            },
          }
        }

      }
      case 'GET_LIST_HOTEL_FAIL': {
        const { error } = action.payload;
        return {
          ...state,
          listHotel: {
            ...state.listHotel,
            load: false,
            error: error,
          },
        }
      }
      
      case 'GET_LIST_ROOM_REQUEST': {
        return {
          ...state,
          listRoom: {
            ...state.listRoom,
            load: true,
          },
        }
      }
      case 'GET_LIST_ROOM_SUCCESS': {
        const { data } = action.payload;
        return {
          ...state,
          listRoom: {
            ...state.listRoom,
            data: data,
            load: false,
          },
        }
      }
      case 'GET_LIST_ROOM_FAIL': {
        const { error } = action.payload;
        return {
          ...state,
          listRoom: {
            ...state.listRoom,
            load: false,
            error: error,
          },
        }
      }
      
      case 'GET_LOCATION_LIST_REQUEST': {
        return {
          ...state,
          locationList: {
            ...state.locationList,
            load: true,
          },
        }
      }

      case 'GET_LOCATION_LIST_SUCCESS': {
        const { data, page, more  } = action.payload;
        if (more) {
          return {
            ...state,
          locationList: {
              ...state.locationList,
              data: [
                ...state.locationList.data,
                ...data,
              ],
              page: page,
              load: false,
            },
          }
        } else {
          return {
            ...state,
          locationList: {
              ...state.locationList,
              data: data,
              page: page,
              load: false,
            },
          }
        }
        // return {
        //   ...state,
        //   locationList: {
        //     ...state.locationList,
        //     data: data,
        //     load: false,
        //   },
        // }
      }
      
      case 'GET_LOCATION_LIST_FAIL': {
        const { error } = action.payload;
        return {
          ...state,
          locationList: {
            ...state.locationList,
            load: false,
            error: error,
          },
        }
      }


      // case 'GET_RATE_LIST_REQUEST': {
      //   return {
      //     ...state,
      //     rateList: {
      //       ...state.rateList,
      //       load: true,
      //     },
      //   }
      // }
      
      // case 'GET_RATE_LIST_SUCCESS': {
      //   const { data } = action.payload;
      //   return {
      //     ...state,
      //     rateList: {
      //       ...state.rateList,
      //       data: data,
      //       load: false,
      //     },
      //   }
      // }
      
      // case 'GET_RATE_LIST_FAIL': {
      //   const { error } = action.payload;
      //   return {
      //     ...state,
      //     rateList: {
      //       ...state.rateList,
      //       load: false,
      //       error: error,
      //     },
      //   }
      // }
      case 'BOOKING_HOTEL_ROOM_SUCCESS': {
        const { data } = action.payload;
        return {
          ...state,
          listRoom: {
            ...state.listRoom,
            data: {
              ...state.listRoom.data,
              bookingHotels: [
                ...state.listRoom.data.bookingHotels,
                data,
              ]
            },
          },
        }
      }
      case 'GET_LIST_HOTEL_BY_RATE_REQUEST': {
        return {
          ...state,
          listHotel: {
            ...state.listHotel,
            load: true,
          },
        }
      }
      case 'GET_LIST_HOTEL_BY_RATE_SUCCESS': {
        const { data } = action.payload;
        return {
          ...state,
          listHotel: {
            ...state.listHotel,
            data: data,
            load: false,
          },
        }
      }
      case 'GET_LIST_HOTEL_BY_RATE_FAIL': {
        const { error } = action.payload;
        return {
          ...state,
          listHotel: {
            ...state.listHotel,
            load: false,
            error: error,
          },
        }
      }
      case 'GET_LIST_HOTEL_BY_ADDRESS_REQUEST': {
        return {
          ...state,
          listHotel: {
            ...state.listHotel,
            load: true,
          },
        }
      }
      case 'GET_LIST_HOTEL_BY_ADDRESS_SUCCESS': {
        const { data } = action.payload;
        return {
          ...state,
          listHotel: {
            ...state.listHotel,
            data: data,
            load: false,
          },
        }
      }
      case 'GET_LIST_HOTEL_BY_ADDRESS_FAIL': {
        const { error } = action.payload;
        return {
          ...state,
          listHotel: {
            ...state.listHotel,
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