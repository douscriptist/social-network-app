import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteComment } from '../../actions/post';
import FromNow from '../../components/moment/FromNow';

const CommentItem = ({ comment: { _id, text, name, avatar, user, date }, auth, pid, deleteComment }) => {
  return (
    <div className={"post bg-comment p-1 my-1 " + (user === auth.user._id ? "bg-comment" : "bg-light")}>
      <div>
        <Link to={`/profile/user/${user}`}>
          <img className="round-img" src={avatar} alt="" />
          <h4> {name} </h4>
        </Link>
      </div>
      <div>
        <p className="my-1"> {text} </p>
        {/* <p className="post-date"> Posted on <Moment format='DD/MM/YYYY HH:mm'>{date}</Moment> */}
        <span className="post-date">
          <FromNow date={date} liveUpdate>
            {moment => moment.fromNow() }
          </FromNow>
        </span>
        {!auth.loading && user === auth.user._id && 
        <button className="btn btn-danger delete-button" onClick={() => deleteComment(pid, _id)}>
          <i className="fas fa-trash-alt"></i>
        </button>
        }
      </div>
    </div>
  )
}

CommentItem.propTypes = {
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  pid: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);