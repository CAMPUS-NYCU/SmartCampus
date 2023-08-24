import React from 'react'

import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  TextField,
  Typography
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Google, Visibility, VisibilityOff } from '@mui/icons-material'

import { useSnackbar } from 'notistack'

import { useUserValue } from '../../utils/contexts/UserContext'
import wave1 from '../../assets/images/main-wave1.svg'
import wave2 from '../../assets/images/main-wave2.svg'
import title from '../../assets/images/title.svg'

const useStyles = makeStyles(() => ({
  form: {
    width: '80vw',
    maxWidth: '400px'
  }
}))

function SignInWithEmailAndPasswordForm() {
  const { enqueueSnackbar } = useSnackbar()
  const classes = useStyles()
  const [passwordVisibility, setPasswordVisibility] = React.useState(false)
  const [formData, setFormData] = React.useState({
    email: '',
    password: ''
  })
  const { signInWithEmailAndPassword } = useUserValue()

  const handleFormDataChange = (prop) => (event) => {
    setFormData({ ...formData, [prop]: event.target.value })
  }

  const handlePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    signInWithEmailAndPassword(formData.email, formData.password)
      .then(() =>
        enqueueSnackbar('登入成功', {
          variant: 'success',
          autoHideDuration: 3000
        })
      )
      .catch(() =>
        enqueueSnackbar('登入失敗', {
          variant: 'error',
          autoHideDuration: 3000
        })
      )
  }

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <FormControl fullWidth margin='normal'>
        <TextField
          label='電子郵件'
          variant='outlined'
          value={formData.email}
          onChange={handleFormDataChange('email')}
        />
      </FormControl>
      <FormControl fullWidth margin='normal'>
        <TextField
          label='密碼'
          variant='outlined'
          type={passwordVisibility ? 'text' : 'password'}
          value={formData.password}
          onChange={handleFormDataChange('password')}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton onClick={handlePasswordVisibility} edge='end'>
                  {passwordVisibility ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      </FormControl>
      <FormControl fullWidth margin='normal'>
        <Button type='submit' variant='contained' color='primary'>
          登入
        </Button>
      </FormControl>
    </form>
  )
}

function SignInWithGoogleButton() {
  const { signInWithGoogle } = useUserValue()
  const disabled = true
  return (
    <Button
      style={{
        // marginTop: '150px',
        background: disabled ? '#AAAAAA' : '#4385F4',
        display: 'none'
      }}
      onClick={signInWithGoogle}
      disabled={disabled}
    >
      <Box display='flex' flexDirection='row' margin={1}>
        <Google style={{ color: 'white' }} />
        <Typography variant='subtitle1' style={{ color: 'white' }}>
          &nbsp;使用Google登入
        </Typography>
      </Box>
    </Button>
  )
}

function SignInWithGuestButton() {
  const { signInWithGuest } = useUserValue()
  const disabled = true
  return (
    <Button
      style={{
        marginTop: '30px',
        color: '#BABABA',
        padding: '0',
        display: 'none'
      }}
      onClick={signInWithGuest}
      disabled={disabled}
    >
      以訪客身分進入
    </Button>
  )
}

export default function LoginPage() {
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
        <SignInWithEmailAndPasswordForm />
        <SignInWithGoogleButton />
        <SignInWithGuestButton />
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
