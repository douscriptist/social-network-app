import React from 'react';
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="text-center py-3">
      <h1 className="x-large text-primary">
        <i className="fas fa-exclamation-triangle text-dark"></i> <br/> Page Not Found
      </h1>
        <p className="large">Sorry, this page does not exist...</p>
        <Link to='/dashboard'>Back to dashboard.</Link>
    </div>
  )
}

export default NotFound;
