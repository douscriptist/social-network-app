import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEducation } from '../../actions/profile';

const AddEducation = ({ addEducation, history }) => {
  const [educationForm, setEducationForm] = useState({
    school: '',
    degree: '',
    fieldOfStudy: '',
    from: '',
    to: '',
    current: false,
    description: '',
  });

  const [isDisabled, setDisabled] = useState(false);

  const { school, degree, fieldOfStudy, from, to, current, description } = educationForm;

  const handleChange = e => {
    setEducationForm({
      ...educationForm,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = e => {
    e.preventDefault();
    addEducation(educationForm, history);
  }

  return (
    <div className="container">
      <h1 className="large text-primary">
        Add An Education
      </h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any school or bootcamp you have attended in the past or now.
      </p>
      <small>* = required field</small>
      <form className="form">
        <div className="form-group">
          <input type="text" placeholder="* School or Bootcamp" name="school" required
            value={school} onChange={e => handleChange(e)} />
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Degree or Certificate" name="degree" required
            value={degree} onChange={e => handleChange(e)} />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Field of Study" name="fieldOfStudy"
            value={fieldOfStudy} onChange={e => handleChange(e)} />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" name="from"
            value={from} onChange={e => handleChange(e)} />
        </div>
        <div className="form-group">
          <input type="checkbox" name="current"
            checked={current}
            id="current"
            value={current} onChange={e => {
              setEducationForm({ ...educationForm, current: !current });
              setDisabled(!isDisabled);
            }}
          />
          <label htmlFor="current"> {' '} Current School</label>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input type="date" name="to"
            disabled={isDisabled ? 'disabled' : ''}
            value={to} onChange={e => handleChange(e)} />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Program Description"
            value={description}
            onChange={e => handleChange(e)}
          />
        </div>
        <input type="submit" onClick={e => handleSubmit(e)} className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
      </form>
    </div>
  )
}

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired
}

export default connect(null, { addEducation })(withRouter(AddEducation));