import React from 'react'
import { makeStyles } from '@mui/styles'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import { useUserValue } from '../../../../utils/contexts/UserContext'

const useStyles = makeStyles((theme) => ({
  grid: {
    position: 'absolute',
    top: '10px',
    width: '100vw',
    maxWidth: '100vw',
    height: '35px',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  button: {
    background: theme.palette.primary.main,
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: '12px',
    borderRadius: '20px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.12)'
  }
}))

function UserInfoResearch() {
  const classes = useStyles()
  const { userEmail, signOut } = useUserValue()

  return (
    <>
      <Grid container className={classes.grid}>
        <Grid mr={1}>Hi, {userEmail}</Grid>

        <Button
          variant='contained'
          className={classes.button}
          onClick={signOut}
        >
          登出
        </Button>
      </Grid>
    </>
  )
}

export default UserInfoResearch
