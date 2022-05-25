import React from 'react';
import Spinner from "react-bootstrap/Spinner";

const Loader = () => (
  <Spinner animation="border" role="status" className='c-loader' type="submit">
    <span className="visually-hidden">Loading...</span>
  </Spinner>
);

export default Loader;
