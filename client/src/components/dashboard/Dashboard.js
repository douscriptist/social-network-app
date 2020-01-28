import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import DashboardActions from '../dashboard/DashboardActions';

const Dashboard = ({ getCurrentProfile, auth: { user }, profile: { loading, profile } }) => {
  useEffect(() => {
    getCurrentProfile();
    // eslint-disable-next-line
  }, []);

  return loading && profile === null
    ? <Spinner />
    : <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome {user && user.name}
      </p>
      {profile !== null
        ? <Fragment>
            <DashboardActions />
        </Fragment>
        : <Fragment>
            <p>You have nat yet created a profile, please add some info...</p>
            <Link to='/create/profile' className='btn btn-primary my-1'>
              Create Profile
      </Link>
        </Fragment>}
    </Fragment>
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);