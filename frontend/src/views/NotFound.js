import React from 'react';
import error from '../images/error.png';

function NotFound() {
  return (
    <div className="notFound">
      <h1>Sorry!!! This page does not exist</h1>
      <img
        src={error}
        //src="https://i.giphy.com/media/3o7aCTPPm4OHfRLSH6/giphy.webp"
        alt="Not found"
      />
    </div>
  );
}

export default NotFound;
