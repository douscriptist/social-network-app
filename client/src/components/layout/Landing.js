import React from 'react';
import { Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

const Landing = ({ isAuthenticated }) => {
  if(isAuthenticated) {
     return <Redirect to='/dashboard' />
  }
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Social Network</h1>
          <p className="lead">
            Learning based app with React. -Social Network
          </p>
          <div className="buttons">
            <Link to='/register' className="btn btn-primary" style={{borderRadius: 30, width: 120}}> Sign Up </Link>
            <Link to='/login' className="btn btn-light" style={{borderRadius: 30, width: 120}}> Login </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

Landing.defaultProps = {
  isAuthenticated: false
}

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);

