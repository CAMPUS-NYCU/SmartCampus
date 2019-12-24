import React from 'react';
import PropTypes from 'prop-types';

import flagImg from '../../../assets/images/red-flag.svg';

Flag.propTypes = {
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
Flag.defaultProps = {
  size: 20,
};

function Flag({ size, ...other }) {
  return (
    <img
      src={flagImg}
      alt="flag icon"
      style={{
        height: size,
      }}
      {...other}
    />
  );
}

export default Flag;
