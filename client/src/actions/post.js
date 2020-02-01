import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT
} from './types';

// Get Posts
export const getPosts = () => async dispatch => {
  try {
    const res = await axios.get('/api/posts');
    dispatch({
      type: GET_POSTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add Like
export const addLike = pid => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/like/${pid}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { pid, likes: res.data}
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Remove Like/Unlike
export const removeLike = pid => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/unlike/${pid}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { pid, likes: res.data}
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete Post
export const deletePost = pid => async dispatch => {
  try {
    await axios.delete(`/api/posts/${pid}`);
    dispatch({
      type: DELETE_POST,
      payload: pid
    });
    dispatch(setAlert('Post removed!', 'primary'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add Post
export const addPost = postForm => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json' 
    }
  };

  try {
    const res = await axios.post('/api/posts', postForm, config);
    dispatch({
      type: ADD_POST,
      payload: res.data
    });
    dispatch(setAlert('Post added!', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get Post by Id
export const getPost = pid => async dispatch => {
  try {
    const res = await axios.get(`/api/posts/${pid}`);
    dispatch({
      type: GET_POST,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add Comment
export const addComment = (pid, postForm) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json' 
    }
  };

  try {
    const res = await axios.post(`/api/posts/comment/${pid}`, postForm, config);
    dispatch({
      type: ADD_COMMENT,
      payload: res.data
    });
    dispatch(setAlert('Comment added!', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete Comment
export const deleteComment = (pid, commid) => async dispatch => {
  try {
    await axios.delete(`/api/posts/comment/${pid}/${commid}`);
    dispatch({
      type: REMOVE_COMMENT,
      payload: commid
    });
    dispatch(setAlert('Comment removed!', 'primary'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};