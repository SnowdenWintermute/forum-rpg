import axios from "axios";
import {
  GET_FORUM_THREADS,
  THREADS_LOADING,
  GET_THREAD,
  THREAD_LOADING,
  GET_ERRORS,
  DELETE_REPLY
} from "./types";

// Get all threads in a section
export const getForumThreads = forumSection => dispatch => {
  dispatch(setThreadsLoading());
  axios
    .get(`/api/forum/${forumSection}/`)
    .then(res =>
      dispatch({
        type: GET_FORUM_THREADS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_FORUM_THREADS,
        payload: {}
      })
    );
};

// Get a thread
export const getThread = (forumSection, threadId) => dispatch => {
  dispatch(setThreadLoading());
  axios
    .get(`/api/forum/${forumSection}/${threadId}/`)
    .then(res =>
      dispatch({
        type: GET_THREAD,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_THREAD,
        payload: {}
      })
    );
};

// Clear a thread from state
export const clearThreadFromState = () => {
  return {
    type: GET_THREAD,
    payload: {}
  };
};

// Create new thread
export const createNewThread = (
  forumSection,
  postData,
  history
) => dispatch => {
  axios
    .post(`/api/forum/${forumSection}/`, postData)
    .then(res => {
      history.push(
        `/forum/${forumSection}/${res.data.threadId}/${res.data.title}`
      );
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Edit thread
export const editThread = (
  forumSection,
  threadId,
  threadTitle,
  threadData,
  history
) => dispatch => {
  axios
    .put(
      `/api/forum/${forumSection}/${threadId}/${threadTitle}/edit`,
      threadData
    )
    .then(res => {
      dispatch({
        type: GET_THREAD,
        payload: res.data
      });
      history.push(
        `/forum/${forumSection}/${res.data.threadId}/${threadData.title
          .split(" ")
          .join("-")}`
      );
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete thread
export const deleteThread = (
  forumSection,
  threadId,
  threadTitle,
  history
) => dispatch => {
  axios
    .delete(`/api/forum/${forumSection}/${threadId}`)
    .then(res => {
      history.push(`/forum/${forumSection}/`);
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Create new reply
export const createNewReply = (
  forumSection,
  threadId,
  threadTitle,
  replyData,
  history
) => dispatch => {
  axios
    .post(
      `/api/forum/${forumSection}/${threadId}/${threadTitle}/reply`,
      replyData
    )
    .then(res => {
      dispatch({
        type: GET_THREAD,
        payload: res.data
      });
      window.scrollTo(0, document.body.scrollHeight);
      dispatch({
        type: GET_ERRORS,
        payload: {}
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Edit reply
export const editReply = (
  forumSection,
  threadId,
  threadTitle,
  replyId,
  replyData,
  history
) => dispatch => {
  axios
    .put(
      `/api/forum/${forumSection}/${threadId}/${threadTitle}/${replyId}`,
      replyData
    )
    .then(res => {
      dispatch({
        type: GET_THREAD,
        payload: res.data
      });
      window.scrollTo(0, document.body.scrollHeight);
      dispatch({
        type: GET_ERRORS,
        payload: {}
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete reply
export const deleteReply = (forumSection, threadId, replyId) => dispatch => {
  axios
    .delete(`/api/forum/${forumSection}/${threadId}/${replyId}`)
    .then(res => {
      dispatch({
        type: DELETE_REPLY,
        payload: replyId
      });
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// Like Thread
export const likeThread = (forumSection, threadId) => dispatch => {
  axios
    .post(`/api/forum/${forumSection}/${threadId}/like`)
    .then(res => {
      dispatch({
        type: GET_THREAD,
        payload: res.data
      });
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// Like Reply
export const likeReply = (forumSection, threadId, replyId) => dispatch => {
  axios
    .post(`/api/forum/${forumSection}/${threadId}/${replyId}/like`)
    .then(res => {
      dispatch({
        type: GET_THREAD,
        payload: res.data
      });
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// Loading threads message
export const setThreadsLoading = () => {
  return {
    type: THREADS_LOADING
  };
};

export const setThreadLoading = () => {
  return {
    type: THREAD_LOADING
  };
};
