import React from 'react'
import PropTypes from 'prop-types'

import pinImg from '../../../../assets/images/pin.svg'

function PinImg({ size }) {
  return (
    <div
      style={{
        display: 'inline-block',
        height: size,
        width: size,
        backgroundImage: `url(${pinImg})`,
        backgroundSize: 'contain'
      }}
    />
  )
}

PinImg.propTypes = {
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}
PinImg.defaultProps = {
  size: 20
}

export default PinImg
