import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import FromNow from '../moment/FromNow';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/post';

const PostItem = ({ post: { _id, text, name, avatar, user, likes, comments, date }, auth, addLike, removeLike, deletePost, showActions, history }) => {
  const handleDelete = () => {
    deletePost(_id); 
    // history.push('/posts');
    // window.location.href = '/posts'
    window.history.back()
  }

  const showButton = history && history.location.pathname === '/posts';

  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/user/${user}`}>
          <img className="round-img" src={avatar} alt="" />
          <h4> {name} </h4>
        </Link>
      </div>
      <div>
        <p className="my-1"> {text} </p>
        <div className="post-date">
          {/* <Moment format='DD/MM/YYYY HH:mm'>{date}</Moment> */}
          <FromNow date={date} liveUpdate>
            {moment => moment.fromNow()}
          </FromNow>
        </div>
        {!showButton &&
          (!auth.loading && user === auth.user._id &&
            <button className="btn btn-danger delete-button" onClick={handleDelete}>
              <i className="fas fa-trash-alt"></i>
            </button>)
        }
        {showActions && <Fragment>
          <button onClick={e => addLike(_id)} type="button" className="btn btn-light">
            <i className="fas fa-thumbs-up"></i> {' '}
            <span> {likes.length > 0 && <span> {likes.length} </span>} </span>
          </button>
          <button onClick={e => removeLike(_id)} type="button" className="btn btn-light">
            <i className="fas fa-thumbs-down"></i>
          </button>
          <Link to={`/posts/${_id}`} className="btn btn-primary">
            {comments.length > 0
              ? (<span> <i className="fas fa-comments"></i> {comments.length} </span>)
              : (<span><i className="far fa-comments"></i> </span>)}
          </Link>
          {!auth.loading && user === auth.user._id && (
            <button onClick={e => deletePost(_id)} type="button" className="btn btn-danger delete-button" >
              <i className="fas fa-trash"></i>
            </button>
          )}
        </Fragment>}
      </div>
    </div>
  )
}

PostItem.defaultProps = {
  showActions: true
}

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(PostItem);