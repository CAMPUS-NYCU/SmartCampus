import React from 'react';
import PropTypes from 'prop-types';

import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';

import useStep from '../../../../../utils/hooks/useStep';
import MissionStepper from './MissionStepper';

MissionDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

const MAX_STEP = 4;
const MIN_STEP = 0;

const useStyles = makeStyles({
});

function MissionDrawer(props) {
  const {
    open,
    onClose,
  } = props;
  const classes = useStyles();

  const missionStepperControl = useStep({ maxStep: MAX_STEP });
  return (
    <Drawer
      anchor="bottom"
      variant="persistent"
      open={open}
      onClose={onClose}
    >
      <MissionStepper
        control={missionStepperControl}
        maxStep={MAX_STEP}
        minStep={MIN_STEP}
      />
    </Drawer>
  );
}

export default MissionDrawer;
