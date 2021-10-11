const initialState = {
  commentList: {
    data: [],
    load: false,
    error: '',
  },
};

export default function commentReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_LIST_COMMENT_REQUEST': {
      return {
        ...state,
        commentList: {
          ...state.commentList,
          load: true,
        },
      }
    }
    case 'GET_LIST_COMMENT_SUCCESS': {
      const { data } = action.payload;
      return {
        ...state,
        commentList: {
          ...state.commentList,
          data: data,
          load: false,
        },
      }
    }
    case 'GET_LIST_COMMENT_FAIL': {
      const { error } = action.payload;
      return {
        ...state,
        commentList: {
          ...state.commentList,
          load: false,
          error: error,
        },
      }
    }
    
    case 'ADD_COMMENT_REQUEST': {
      return {
        ...state,
        commentList: {
          ...state.commentList,
          load: true,
        },
      }
    }
    case 'ADD_COMMENT_SUCCESS': {
      const { data } = action.payload;
      return {
        ...state,
        commentList: {
          ...state.commentList,
          data: [
            data,
            ...state.commentList.data
          ],
          load: false,
        },
      }
    }
    case 'ADD_COMMENT_FAIL': {
      const { error } = action.payload;
      return {
        ...state,
        commentList: {
          ...state.commentList,
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