import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST
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
    const res = await axios.delete(`/api/posts/${pid}`);
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