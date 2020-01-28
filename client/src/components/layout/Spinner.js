import React from 'react';
import spinner from './spinner.gif';

const Spinner = () => {
  return (
    <>
      <img
        src={spinner}
        alt="Loading..."
        style={{ width: 200, margin: "auto", display: "block" }}
      />
    </>
  )
}

export default Spinner
