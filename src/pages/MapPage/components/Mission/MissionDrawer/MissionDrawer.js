import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import useStep from '../../../../../utils/hooks/useStep';
import MissionStepper from './MissionStepper';
import MissionStep1 from './MissionStep1';
import MissionStep2 from './MissionStep2';
import MissionStep3 from './MissionStep3';
import MissionStep4 from './MissionStep4';
import MissionStep5 from './MissionStep5';

MissionDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  handleAddMissionComplete: PropTypes.func.isRequired,
};

const MAX_STEP = 4;
const MIN_STEP = 0;

const useStyles = makeStyles({
  drawerContent: {
    minHeight: 150,
    height: '20vh',
    width: '100%',
  },
  drawerContentFull: {
    minHeight: 400,
    height: '85vh',
  },
});

function MissionDrawer(props) {
  const {
    open,
    onClose,
    handleAddMissionComplete,
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
      <div
        className={classnames(classes.drawerContent,
          missionStepperControl.step >= 2 && classes.drawerContentFull)}
      >
        <Box p={2}>
          {missionStepperControl.step === 0 && (
          <MissionStep1 />
          )}
          {missionStepperControl.step === 1 && (
          <MissionStep2 />
          )}
          {missionStepperControl.step === 2 && (
          <MissionStep3 />
          )}
          {missionStepperControl.step === 3 && (
          <MissionStep4 />
          )}
          {missionStepperControl.step === 4 && (
          <MissionStep5 />
          )}
        </Box>

        <MissionStepper
          control={missionStepperControl}
          maxStep={MAX_STEP}
          minStep={MIN_STEP}
          handleCloseDrawer={onClose}
          handleComplete={handleAddMissionComplete}
        />
      </div>
    </Drawer>
  );
}

export default MissionDrawer;
