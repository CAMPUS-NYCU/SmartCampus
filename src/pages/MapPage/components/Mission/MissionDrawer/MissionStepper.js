import React from 'react';

import Button from '@material-ui/core/Button';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';
import MobileStepper from '@material-ui/core/MobileStepper';
import { makeStyles } from '@material-ui/core/styles';
import {
  MISSION_MAX_STEP,
  MISSION_MIN_STEP,
  MISSION_NUM_STEPS,
  useMissionValue,
} from '../../../contexts/MissionContext';

const useStyles = makeStyles({
  stepper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0)', // 不要預設的灰底
  },
  button: {
    minWidth: 80,
  },
});

function MissionStepper(props) {
  const classes = useStyles();
  const {
    currentStep,
    handleBack,
    handleNext,
    handleCompleteMission,
    handleCloseMission,
  } = useMissionValue();

  return (
    <MobileStepper
      variant="dots"
      steps={MISSION_NUM_STEPS}
      position="static"
      activeStep={currentStep}
      className={classes.stepper}
      backButton={
        currentStep <= MISSION_MIN_STEP ? (
          <Button size="small" onClick={handleCloseMission} className={classes.button}>
            <CloseIcon fontSize="small" /> 關閉
          </Button>
        ) : (
          <Button size="small" onClick={handleBack} className={classes.button}>
            <KeyboardArrowLeft /> 上一步
          </Button>
        )
      }
      nextButton={
        currentStep >= MISSION_MAX_STEP ? (
          <Button color="primary" size="small" onClick={handleCompleteMission} className={classes.button}>
            完成 <DoneIcon fontSize="small" />
          </Button>
        ) : (
          <Button size="small" onClick={handleNext} className={classes.button}>
            下一步 <KeyboardArrowRight />
          </Button>
        )
      }
      {...props}
    />
  );
}

export default MissionStepper;
