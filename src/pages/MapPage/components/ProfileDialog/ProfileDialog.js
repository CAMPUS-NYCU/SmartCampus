import React from 'react';
import PropTypes from 'prop-types';

import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import PersonIcon from '@material-ui/icons/Person';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';

ProfileDialog.propTypes = {
  control: PropTypes.shape({
    open: PropTypes.bool.isRequired,
    setClose: PropTypes.func.isRequired,
  }).isRequired,
};

const useStyles = makeStyles((theme) => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));


function ProfileDialog(props) {
  const {
    control: {
      open,
      setClose,
    },
  } = props;
  const classes = useStyles();

  return (
    <Dialog
      onClose={setClose}
      aria-labelledby="profile-dialog"
      open={open}
      fullWidth
    >
      <DialogTitle disableTypography onClose={setClose}>
        <Typography variant="h6">
          個人資料
        </Typography>
        <IconButton aria-label="close" className={classes.closeButton} onClick={setClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Box m={3}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid container>
                <Avatar>
                  <PersonIcon />
                </Avatar>
                <Box ml={2}>
                  <Typography variant="subtitle1">
                    <b>Eason Chang</b>
                  </Typography>
                  <Typography>
                    eason@easonchang.com
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="outlined"
                size="small"
              >
                Sign Out
              </Button>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default ProfileDialog;
