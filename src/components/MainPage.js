import React from 'react'
import Box from '@material-ui/core/Box'
import title from '../assets/images/title.svg'
import wave1 from '../assets/images/main-wave1.svg'
import wave2 from '../assets/images/main-wave2.svg'
import mainIcon from '../assets/images/main-icon.svg'

export default function MainPage(){
  return (
    <Box
      style={{ height: '100vh-150px', width: '100vw' }}
      display='flex'
      flexDirection='column'
      alignItems='center'
    >
      <div
        style={{
          backgroundImage: `url(${mainIcon})`,
          width: '200px',
          height: '200px',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          marginTop: '150px'
        }}
      />
      <div
        style={{
          backgroundImage: `url(${title})`,
          width: '280px',
          height: '38px',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          marginTop: '20px'
        }}
      />
      <div
        style={{
          backgroundImage: `url(${wave1})`,
          position: 'absolute',
          bottom: '0',
          height: '150px',
          width: '100%',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
      />
      <div
        style={{
          backgroundImage: `url(${wave2})`,
          position: 'absolute',
          bottom: '0',
          height: '150px',
          width: '100%',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          zIndex: '-100'
        }}
      />
    </Box>
  )
}
