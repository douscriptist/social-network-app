import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfileById } from '../../actions/profile';
import { Link } from 'react-router-dom';

const Profile = ({ match, getProfileById, auth, profile: { profile, loading } }) => {
  useEffect(() => {
    getProfileById(match.params.userId)
  }, [getProfileById]);

  return (
    <div className="container">
      {profile === null || loading
        ? <Spinner />
        : <Fragment>
          <Link to='/profiles' className="btn btn-light">
            Back To Profiles
          </Link>
          {auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id && (
            <Link to='/update/profile' className='btn btn-dark'>
              Edit Profile
            </Link>
          )}
        </Fragment>
      }
    </div>
  )
}

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state =>({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getProfileById })(Profile);
