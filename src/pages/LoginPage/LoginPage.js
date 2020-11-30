import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'

import wave1 from '../../assets/images/main-wave1.svg'
import wave2 from '../../assets/images/main-wave2.svg'

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
      justifyContent='center'
    >
      <Button
        style={{
          width: '100px',
          height: '100px',
          marginTop: '50%'
        }}
        onClick={signInWithGoogle}
      >
        登入
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
