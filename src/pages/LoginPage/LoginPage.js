import React from 'react'

import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

import { useUserValue } from '../../utils/contexts/UserContext'
import wave1 from '../../assets/images/main-wave1.svg'
import wave2 from '../../assets/images/main-wave2.svg'
import googleIcon from '../../assets/images/google_icon.png'
import title from '../../assets/images/title.svg'

export default function LoginPage() {
  const { signInWithGoogle, signInWithGuest } = useUserValue()

  return (
    <Box
      style={{
        height: 'calc(var(--vh, 1vh)*100)',
        width: '100vw',
        position: 'fixed'
      }}
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
      <Box
        flexGrow={1}
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
      >
        <Button
          style={{
            width: '220px',
            height: '50px',
            // marginTop: '150px',
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
          <Typography
            variant='subtitle1'
            style={{ color: 'white', marginLeft: '50px' }}
          >
            使用Google登入
          </Typography>
        </Button>
        <Button
          style={{
            marginTop: '30px',
            color: '#BABABA',
            padding: '0'
          }}
          onClick={signInWithGuest}
        >
          以訪客身分進入
        </Button>
      </Box>
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
