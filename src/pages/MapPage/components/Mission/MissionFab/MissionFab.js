import React from 'react';
import PropTypes from 'prop-types';

import AddLocationIcon from '@material-ui/icons/AddLocation';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  missionFab: {
    position: 'absolute',
    bottom: theme.spacing(4),
    left: 'calc(50vw - 28px)',
  },
}));

const MissionFab = React.forwardRef((props, ref) => {
  const {
    onClick,
    ...otherProps
  } = props;
  const classes = useStyles();
  return (
    <Fab
      color="primary"
      aria-label="mission"
      size="large"
      className={classes.missionFab}
      onClick={onClick}
      ref={ref}
      {...otherProps}
    >
      <AddLocationIcon fontSize="large" />
    </Fab>
  );
});

MissionFab.propTypes = {
  onClick: PropTypes.func,
};
MissionFab.defaultProps = {
  onClick: null,
};

export default MissionFab;
