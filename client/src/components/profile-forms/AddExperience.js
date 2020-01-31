import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExperience } from '../../actions/profile';

const AddExperience = ({ addExperience, history }) => {
  const [experienceForm, setExperienceForm] = useState({
    company: '',
    title: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: '',
  });

  const [isDisabled, setDisabled] = useState(false);

  const { company, title, location, from, to, current, description } = experienceForm;

  const handleChange = e => {
    setExperienceForm({
      ...experienceForm,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = e => {
    e.preventDefault();
    addExperience(experienceForm, history);
  }

  return (
    <div className="container">
      <h1 className="large text-primary">
        Add An Experience
      </h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form className="form">
        <div className="form-group">
          <input type="text" placeholder="* Job Title" name="title" required
            value={title} onChange={e => handleChange(e)} />
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Company" name="company" required
            value={company} onChange={e => handleChange(e)} />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Location" name="location"
            value={location} onChange={e => handleChange(e)} />
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
              setExperienceForm({ ...experienceForm, current: !current });
              setDisabled(!isDisabled);
            }} />
          <label htmlFor="current"> {' '} Current Job</label>
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
            placeholder="Job Description"
            value={description}
            onChange={e => handleChange(e)}
          />
        </div>
        <input type="submit" value="Add" onClick={e => handleSubmit(e)} className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
      </form>
    </div>
  )
}

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired
}

export default connect(null, { addExperience })(withRouter(AddExperience));