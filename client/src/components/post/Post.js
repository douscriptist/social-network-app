import React, { useEffect, Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPost } from '../../actions/post';
import Spinner from '../layout/Spinner';
import PostItem from '../posts/PostItem';
import { Link } from 'react-router-dom';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

const Post = ({ post: { post, loading }, getPost, match }) => {
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    getPost(match.params.pid);
  }, [getPost, match.params.pid]);

  return <div className="container">
    {loading || post === null
      ? <Spinner />
      : <Fragment>
        <Link to='/posts' className="btn">Back To Posts </Link>
        <PostItem post={post} showActions={false} />
        <div className="post-form">
          <div className="bg-primary p comments">
            <h2>Comments</h2>
            {post.comments.length > 0 &&
              <button onClick={() => setOpen(!isOpen)} type="button" className="btn btn-light">
                {isOpen ? 'Hide Comments' : 'Show Comments'}
              </button>
            }
          </div>
          {isOpen && post.comments.map(comm => (
            <CommentItem key={comm._id} comment={comm} pid={post._id} />))
          }
          <CommentForm pid={post._id} />
        </div>
      </Fragment>
    }
  </div>
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getPost })(Post);