import { Fragment, useState, useEffect } from 'react';
import React from 'react';

const Loader = ({isLoading}) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    let timeout;

    if (isLoading) {
      // Show loader immediately
      setShow(true);
    } else {
      // Hide loader after 1 second delay
      timeout = setTimeout(() => setShow(false), 1000);
    }

    return () => clearTimeout(timeout);
  }, [isLoading]);

  return (
    <Fragment>
      <div className={`loader-wrapper ${show ? '' : 'loader-hide'}`}>
        <div className="theme-loader">
            <div className="loader-p"></div>
        </div>
      </div>
    </Fragment>
  );
};

export default Loader;