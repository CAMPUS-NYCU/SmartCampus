import React from 'react';
import PropTypes from 'prop-types';

import Drawer from '@material-ui/core/Drawer';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { makeStyles } from '@material-ui/core/styles';

import useStep from '../../../../../utils/hooks/useStep';

MissionDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

const MAX_STEP = 4;
const MIN_STEP = 0;

const useStyles = makeStyles({
  stepper: {
    flexGrow: 1,
  },
});

function MissionDrawer(props) {
  const {
    open,
    onClose,
  } = props;
  const classes = useStyles();

  const { step, handleNext, handleBack } = useStep({ maxStep: MAX_STEP });
  return (
    <Drawer
      anchor="bottom"
      variant="persistent"
      open={open}
      onClose={onClose}
    >
      <MobileStepper
        variant="dots"
        steps={MAX_STEP + 1}
        position="static"
        activeStep={step}
        className={classes.stepper}
        nextButton={(
          <Button size="small" onClick={handleNext} disabled={step === MAX_STEP}>
            下一步 <KeyboardArrowRight />
          </Button>
        )}
        backButton={(
          <Button size="small" onClick={handleBack} disabled={step === MIN_STEP}>
            <KeyboardArrowLeft /> 上一步
          </Button>
        )}
      />
    </Drawer>
  );
}

export default MissionDrawer;
