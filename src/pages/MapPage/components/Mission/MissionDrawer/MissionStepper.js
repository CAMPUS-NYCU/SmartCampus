import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
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
};
MissionStepper.defaultProps = {
  minStep: 0,
};

const useStyles = makeStyles({
  stepper: {
    flexGrow: 1,
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
  } = props;
  const classes = useStyles();

  return (
    <MobileStepper
      variant="dots"
      steps={maxStep + 1}
      position="static"
      activeStep={step}
      className={classes.stepper}
      nextButton={(
        <Button size="small" onClick={handleNext} disabled={step === maxStep}>
          下一步 <KeyboardArrowRight />
        </Button>
      )}
      backButton={(
        <Button size="small" onClick={handleBack} disabled={step === minStep}>
          <KeyboardArrowLeft /> 上一步
        </Button>
      )}
    />
  );
}

export default MissionStepper;
