import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/post';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import PostForm from './PostForm';

const Posts = ({ post: { posts, loading }, getPosts, history}) => {
  const [isAddOpen, setAddOpen] = useState(false);

  useEffect(() => {
    getPosts();
  }, [getPosts])

  return (loading
    ? <Spinner />
    : <div className="container">
      <h1 className="large text-primary">Posts</h1>
      <p className="lead post-header">
        <span><i className="fas fa-user"></i> Welcome to the community...</span>
        <span> {!isAddOpen &&
          <button onClick={() => setAddOpen(!isAddOpen)} type="button" className="btn btn-light">
            <span><i className="fas fa-plus"></i> Add Post</span>
          </button>}
        </span>
      </p>

      {isAddOpen &&
        <PostForm isAddOpen={isAddOpen} setAddOpen={setAddOpen} />
      }

      <div className="posts">
        {posts.map(post => (
          <PostItem key={post._id} post={post} history={history} />
        ))}
      </div>
    </div>)
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getPosts })(Posts);