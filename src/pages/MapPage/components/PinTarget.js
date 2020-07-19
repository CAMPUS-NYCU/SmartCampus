import React from 'react'

import flagImg from 'assets/images/pin.svg'

function PinTarget() {
  return (
    <img
      src={flagImg}
      alt=''
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -100%)',
        zIndex: 50,
        height: 50,
        width: 50
      }}
      draggable={false}
    />
  )
}

export default PinTarget
