import React from 'react';
import './Spinner.css';

const Spinner = () => (
  <div className="spinner-wrapper">
    <div className="spinner" />
    <p>Loading map...</p>
  </div>
);

export default Spinner;
