import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteEducation } from '../../actions/profile';

const Education = ({ education, deleteEducation }) => {
  const educations = education.map(edu => (
    <tr key={edu._id}>
      <td className="hide-sm">{edu.school}</td>
      <td className="hide-sm">{edu.degree}</td>
      <td className="hide-sm">
        <Moment format='DD/MM/YYYY'>{edu.from}</Moment> - {' '}
        {edu.current
          ? ('Now')
          : (<Moment format='DD/MM/YYYY'>{edu.to}</Moment>)}
      </td>
      <td>
        <button className="btn btn-danger" onClick={() => deleteEducation(edu._id)}>
          <i className="fas fa-trash-alt"></i>
        </button>
      </td>
    </tr>
  ))

  return (
    <Fragment>
      <h2 className="my-1">Education Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          { educations }
        </tbody>
      </table>
    </Fragment>
  )
}

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired
}

export default connect(null, { deleteEducation })(Education);
