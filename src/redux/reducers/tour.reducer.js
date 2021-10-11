const initialState = {
  tourList: {
    data: [],
    load: false,
    error: '',
  },
  topicTourList: {
    data: [],
    load: false,
    error: '',
  },
  tourDetail: {
    data: {
      location: {}
    },
    load: false,
    error: '',
  },
};

export default function tourReducer(state = initialState, action) {
  switch (action.type) {
    // Tour list
    case 'GET_TOUR_LIST_REQUEST': {
      return {
        ...state,
        tourList: {
          ...state.tourList,
          load: true,
        },
      }
    }
    case 'GET_TOUR_LIST_SUCCESS': {
      const { data } = action.payload;
      return {
        ...state,
        tourList: {
          ...state.tourList,
          data: data,
          load: false,
        },
      }
    }
    case 'GET_TOUR_LIST_FAIL': {
      const { error } = action.payload;
      return {
        ...state,
        tourList: {
          ...state.tourList,
          load: false,
          error: error,
        },
      }
    }
    case 'GET_TOPIC_TOUR_LIST_REQUEST': {
      return {
        ...state,
        topicTourList: {
          ...state.topicTourList,
          load: true,
        },
      }
    }
    case 'GET_TOPIC_TOUR_LIST_SUCCESS': {
      const { data } = action.payload;
      return {
        ...state,
        topicTourList: {
          ...state.topicTourList,
          data: data,
          load: false,
        },
      }
    }
    case 'GET_TOPIC_TOUR_LIST_FAIL': {
      const { error } = action.payload;
      return {
        ...state,
        topicTourList: {
          ...state.topicTourList,
          load: false,
          error: error,
        },
      }
    }
    // Tour detail
    case 'GET_TOUR_DETAIL_REQUEST': {
      return {
        ...state,
        tourDetail: {
          ...state.tourDetail,
          load: true,
        },
      }
    }
    case 'GET_TOUR_DETAIL_SUCCESS': {
      const { data } = action.payload;
      return {
        ...state,
        tourDetail: {
          ...state.tourDetail,
          data: data,
          load: false,
        },
      }
    }
    case 'GET_TOUR_DETAIL_FAIL': {
      const { error } = action.payload;
      return {
        ...state,
        tourList: {
          ...state.tourDetail,
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