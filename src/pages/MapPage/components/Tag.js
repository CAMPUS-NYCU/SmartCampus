import React from 'react';
// import PropTypes from 'prop-types';

import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import AccessibleForwardIcon from '@material-ui/icons/AccessibleForward';

// Tag.propTypes = {
//   tagData: PropTypes.object.isRequired,
// };
// Tag.defaultProps = {
//   tagData: {},
// };

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
  },
}));
function Tag(props) {
  const classes = useStyles();

  return (
    <Avatar className={classes.avatar}>
      <AccessibleForwardIcon />
    </Avatar>
  );
}

export default Tag;
