import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post';

const CommentForm = ({ pid, addComment }) => {
  const [text, setCommentText] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    addComment(pid, { text });
    setCommentText('');
  };

  return (
    <form className="form my-1">
      <textarea
        name="text"
        rows="3"
        placeholder="Add a comment"
        required
        value={text}
        onChange={e => setCommentText(e.target.value)}/>
      <input type="submit" onClick={e => handleSubmit(e)} className="btn btn-dark my-1" value="Add Comment" />
    </form>
  )
}

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  pid: PropTypes.string.isRequired
}

export default connect(null, { addComment })(CommentForm);