import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';
import MobileStepper from '@material-ui/core/MobileStepper';
import { makeStyles } from '@material-ui/core/styles';

MissionStepper.propTypes = {
  control: PropTypes.shape({
    step: PropTypes.number.isRequired,
    handleNext: PropTypes.func.isRequired,
    handleBack: PropTypes.func.isRequired,
  }).isRequired,
  maxStep: PropTypes.number.isRequired,
  minStep: PropTypes.number,
  handleCloseDrawer: PropTypes.func.isRequired,
  handleComplete: PropTypes.func.isRequired,
};
MissionStepper.defaultProps = {
  minStep: 0,
};

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
  const {
    control: {
      step,
      handleNext,
      handleBack,
    },
    maxStep,
    minStep,
    handleCloseDrawer,
    handleComplete,
  } = props;
  const classes = useStyles();

  return (
    <MobileStepper
      variant="dots"
      steps={maxStep + 1}
      position="static"
      activeStep={step}
      className={classes.stepper}
      backButton={
        step <= minStep ? (
          <Button size="small" onClick={handleCloseDrawer} className={classes.button}>
            <CloseIcon fontSize="small" /> 關閉
          </Button>
        ) : (
          <Button size="small" onClick={handleBack} className={classes.button}>
            <KeyboardArrowLeft /> 上一步
          </Button>
        )
      }
      nextButton={
        step >= maxStep ? (
          <Button color="primary" size="small" onClick={handleComplete} className={classes.button}>
            完成 <DoneIcon fontSize="small" />
          </Button>
        ) : (
          <Button size="small" onClick={handleNext} disabled={step === maxStep} className={classes.button}>
            下一步 <KeyboardArrowRight />
          </Button>
        )
      }
    />
  );
}

export default MissionStepper;
