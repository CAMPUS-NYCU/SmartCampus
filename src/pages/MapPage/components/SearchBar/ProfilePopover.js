import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import Button from '@material-ui/core/Button';

ProfilePopover.propTypes = {
  anchorEl: PropTypes.element,
  handleClose: PropTypes.func.isRequired,
};
ProfilePopover.defaultProps = {
  anchorEl: null,
};

function ProfilePopover(props) {
  const {
    anchorEl,
    handleClose,
  } = props;
  const open = Boolean(anchorEl);

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
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

    </Popover>
  );
}

export default ProfilePopover;
