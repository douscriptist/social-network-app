import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileEducation = ({ education: { school, degree, fieldOfStudy, current, to, from, description } }) => (
  <div className={current ? 'bg-light' : ''}>
    <h3 className="text-dark"> {school} </h3>
    <p>
      <Moment format='DD/MM/YYYY'>{from}</Moment> - {!to ? 'Now' : <Moment format='DD/MM/YYYY'> {to} </Moment>}
    </p>
    <p><strong>Position: </strong> {degree} </p>
    <p><strong>Description: </strong>{description}</p>
    <p><strong>Field Of Study: </strong>{fieldOfStudy}</p>
  </div>
)

ProfileEducation.propTypes = {
  education: PropTypes.object.isRequired
}

export default ProfileEducation
