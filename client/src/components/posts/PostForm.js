import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';

const PostForm = ({ addPost, isAddOpen, setAddOpen }) => {
  const [text, setPostText] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    addPost({ text });
    setPostText('');
  }

  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Say Something...</h3>
      </div>
      <form className="form my-1">
        <textarea
          name="text"
          rows="4"
          placeholder="Create a post"
          required
          value={text}
          onChange={e => setPostText(e.target.value)}
        ></textarea>
        <input type="submit" onClick={e => handleSubmit(e)} className="btn btn-dark my-1" value="Add" />
        <input type="submit" onClick={e => { e.preventDefault(); setAddOpen(!isAddOpen);}} className="btn btn-danger my-1" value="Cancel" />
      </form>
    </div>)
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired
}

export default connect(null, { addPost })(PostForm);