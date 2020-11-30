import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

import wave1 from '../../assets/images/main-wave1.svg'
import wave2 from '../../assets/images/main-wave2.svg'
import googleIcon from '../../assets/images/google_icon.png'
import title from '../../assets/images/title.svg'

const useStyles = makeStyles((theme) => ({
  page: {
    height: window.innerHeight,
    width: '100vw',
    // 白色透明 overlay
    background: 'white',
    // backgroundImage: `url(${mapBackgroundImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundColor: 'rgba(255,255,255,0.5)',
    padding: theme.spacing(4),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    minWidth: 275
  }
}))

export default function LoginPage(props) {
  const { signInWithGoogle, signInWithFacebook, signOut, user } = props
  const classes = useStyles()

  return (
    <Box
      style={{ height: '100vh-150px', width: '100vw' }}
      display='flex'
      flexDirection='column'
      alignItems='center'
    >
      <div
        style={{
          backgroundImage: `url(${title})`,
          width: '300px',
          height: '40px',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          marginTop: '100px'
        }}
      />
      <Button
        style={{
          width: '220px',
          height: '50px',
          marginTop: '40%',
          background: '#4385F4'
        }}
        onClick={signInWithGoogle}
      >
        <Box
          style={{
            width: '45px',
            height: '45px',
            background: 'white',
            position: 'absolute',
            left: '2.5px'
          }}
          display='flex'
          justifyContent='center'
          alignItems='center'
        >
          <div
            style={{
              backgroundImage: `url(${googleIcon})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              width: '60%',
              height: '60%'
            }}
          />
        </Box>
        <Typography variant='6h' style={{ color: 'white', marginLeft: '50px' }}>
          使用Google登入
        </Typography>
      </Button>
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
