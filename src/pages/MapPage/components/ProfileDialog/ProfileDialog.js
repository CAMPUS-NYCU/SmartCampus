import React from 'react'
import PropTypes from 'prop-types'

import DialogTitle from '@material-ui/core/DialogTitle'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import DialogContent from '@material-ui/core/DialogContent'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import { makeStyles } from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/Close'
import PersonIcon from '@material-ui/icons/Person'
import Avatar from '@material-ui/core/Avatar'
import Box from '@material-ui/core/Box'
import { AppBar, Toolbar } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import EditIcon from '@material-ui/icons/Edit'

ProfileDialog.propTypes = {
  control: PropTypes.shape({
    open: PropTypes.bool.isRequired,
    setClose: PropTypes.func.isRequired
  }).isRequired
}

const useStyles = makeStyles((theme) => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },
  picture: {
    width: theme.spacing(15),
    height: theme.spacing(15)
  }
}))

function ProfileDialog(props) {
  const {
    control: { open, setClose }
  } = props
  const classes = useStyles()

  return (
    <Dialog
      onClose={setClose}
      aria-labelledby='profile-dialog'
      open={open}
      fullScreen
    >
      <AppBar position='static'>
        <Toolbar>
          <IconButton edge='start' onClick={setClose}>
            <ArrowBackIcon style={{ color: 'ffffff' }} />
          </IconButton>
          <Typography variant='h6'>個人資訊</Typography>
        </Toolbar>
      </AppBar>
      <DialogContent>
        <Box m={3} display='flex' flexDirection='column' alignItems='center'>
          <>
            <Avatar
              className={classes.picture}
              src='https://github.githubassets.com/images/modules/open_graph/github-mark.png'
            >
              <IconButton style={{ position: 'absolute', bottom: '0' }}>
                <EditIcon style={{ color: 'C6C6C6' }} />
              </IconButton>
              <div
                style={{
                  height: '40px',
                  width: '40px',
                  background: 'rgba(0, 0, 0, 0.35)',
                  position: 'absolute',
                  bottom: '0'
                }}
              />
            </Avatar>
          </>
          <Box m={4} display='flex' alignItems='center'>
            <Typography variant='h5'>個人資訊</Typography>
            <IconButton edge='end'>
              <EditIcon style={{ color: 'C6C6C6' }} />
            </IconButton>
          </Box>

          {/* <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid container>
                <Avatar>
                  <PersonIcon />
                </Avatar>
                <Box ml={2}>
                  <Typography variant='subtitle1'>
                    <b>Eason Chang</b>
                  </Typography>
                  <Typography>eason@easonchang.com</Typography>
                </Box>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Button variant='outlined' size='small'>
                Sign Out
              </Button>
            </Grid>
          </Grid> */}
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default ProfileDialog
