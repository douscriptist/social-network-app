import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import DashboardActions from '../dashboard/DashboardActions';
import Experience from '../dashboard/Experience';
import Education from '../dashboard/Education';

const Dashboard = ({ getCurrentProfile, deleteAccount, auth: { user }, profile: { loading, profile } }) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && profile === null
    ? <Spinner />
    : <div className="container">
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome {user && user.name}
      </p>
      {profile !== null
        ? <Fragment>
            <DashboardActions />
            <Experience experience={profile.experience} />
            <Education education={profile.education} />
            <div className="my-2">
              <button className="btn btn-danger" onClick={() => deleteAccount()}>
                <i className="fas fa-trash"></i> Delete My Account
              </button>
            </div>
        </Fragment>
        : <Fragment>
            <p>You have nat yet created a profile, please add some info...</p>
            <Link to='/create/profile' className='btn btn-primary my-1'>
              Create Profile
      </Link>
        </Fragment>}
    </div>
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  deleteAccount: PropTypes.func.isRequired
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);