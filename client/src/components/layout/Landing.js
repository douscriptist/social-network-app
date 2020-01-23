import React from 'react';
import { Link } from "react-router-dom";

const Landing = () => {
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

export default Landing;

