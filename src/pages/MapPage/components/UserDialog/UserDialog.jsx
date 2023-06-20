import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import DialogContent from '@mui/material/DialogContent'
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import { makeStyles } from '@mui/styles'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import { AppBar, Toolbar } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import AssessmentIcon from '@mui/icons-material/Assessment'
import EmailIcon from '@mui/icons-material/Email'
import useUserDetail from '../../../../utils/hooks/useUserDetail'
import { useUserValue } from '../../../../utils/contexts/UserContext'

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

function UserDialog(props) {
  const {
    userId,
    control: { open, setClose }
  } = props
  const { uid, userEmail } = useUserValue()
  // console.log(uid)
  const classes = useStyles()
  // const {userDetail,getUserDetail}=useUserDetail()
  const { userDetail, getUserDetail, loading } = useUserDetail({ userId })
  useEffect(() => {
    if (open) getUserDetail({ variables: { uid: userId } })
  }, [open, getUserDetail, userId])
  return (
    <>
      <Dialog
        onClose={setClose}
        aria-labelledby='profile-dialog'
        open={open}
        fullScreen
      >
        <AppBar position='static'>
          <Toolbar>
            <IconButton edge='start' onClick={setClose}>
              <ArrowBackIcon style={{ color: '000000' }} />
            </IconButton>
            <Typography variant='h6'>個人資訊</Typography>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <Box m={3} display='flex' flexDirection='column' alignItems='center'>
            <Avatar className={classes.picture} src={userDetail.photoURL} />
            <Box m={4} display='flex' alignItems='center'>
              <Typography variant='h5'>{userDetail.displayName}</Typography>
            </Box>
            <Grid container spacing={2}>
              {userId === uid && (
                <Grid item container xs={12} alignItems='center'>
                  <EmailIcon style={{ marginRight: '8px' }} />
                  {userEmail}
                </Grid>
              )}
              <Grid item container xs={12} alignItems='center'>
                <AssessmentIcon style={{ marginRight: '8px' }} />
                回報次數：{userDetail.userAddTagNumber}
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>
      <Dialog
        open={loading}
        PaperProps={{
          style: {
            backgroundColor: 'transparent',
            boxShadow: 'none',
            width: '50px',
            height: '50px'
          }
        }}
      >
        <CircularProgress />
      </Dialog>
    </>
  )
}

UserDialog.propTypes = {
  control: PropTypes.shape({
    open: PropTypes.bool.isRequired,
    setClose: PropTypes.func.isRequired
  }).isRequired
}

export default UserDialog
