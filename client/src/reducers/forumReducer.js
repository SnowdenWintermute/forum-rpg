import {
  GET_FORUM_THREADS,
  THREADS_LOADING,
  THREAD_LOADING,
  GET_THREAD,
  CREATE_NEW_REPLY,
  DELETE_REPLY
} from "../actions/types";

const initialState = {
  threads: null,
  thread: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case THREADS_LOADING:
      return {
        ...state,
        loading: true
      };
    case THREAD_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_FORUM_THREADS:
      return {
        ...state,
        threads: action.payload,
        loading: false
      };
    case GET_THREAD:
      return {
        ...state,
        thread: action.payload,
        loading: false
      };
    case CREATE_NEW_REPLY:
      return {
        ...state,
        errors: {},
        thread: {
          ...state.thread,
          replies: [...state.thread.replies, action.payload]
        }
      };
    case DELETE_REPLY:
      return {
        ...state,
        thread: {
          ...state.thread,
          replies: state.thread.replies.filter(
            reply => reply._id !== action.payload
          )
        }
      };
    default:
      return state;
  }
}
