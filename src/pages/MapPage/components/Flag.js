import React from 'react';
import PropTypes from 'prop-types';

import flagImg from '../../../assets/images/red-flag.svg';

Flag.propTypes = {
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
Flag.defaultProps = {
  size: 20,
};

function Flag({ size }) {
  return (
    <div
      style={{
        display: 'inline-block',
        height: size,
        width: size,
        objectFit: 'cover',
        backgroundImage: `url(${flagImg})`,
      }}
    />
  );
}

export default Flag;
