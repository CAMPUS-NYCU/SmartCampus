import React from 'react'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import DoneIcon from '@material-ui/icons/Done'
import MobileStepper from '@material-ui/core/MobileStepper'
import { makeStyles } from '@material-ui/core/styles'
import {
  MISSION_MAX_STEP,
  MISSION_MIN_STEP,
  useMissionValue,
  MissionStep
} from '../../../contexts/MissionContext'

const useStyles = makeStyles({
  stepper: {
    position: 'fixed',
    bottom: 0,
    width: '100%'
    // backgroundColor: 'rgba(0,0,0,0)' // 不要預設的灰底
  },
  button: {
    minWidth: 80
  }
})

function MissionStepper(props) {
  const classes = useStyles()
  const {
    currentStep,
    handleBack,
    handleNext,
    handleCompleteMission,
    handleCloseMission
  } = useMissionValue()
  const { PlaceFlagOnStreet } = MissionStep
  return (
    <>
      {currentStep === PlaceFlagOnStreet ? (
        <MobileStepper
          variant='dots'
          steps={0}
          position='bottom'
          // activeStep={currentStep}
          activeStep={-1}
          className={classes.stepper}
          backButton={
            <Button
              size='medium'
              onClick={handleBack}
              className={classes.button}
            >
              上一步
            </Button>
          }
          nextButton={
            <Button
              size='medium'
              onClick={handleBack}
              className={classes.button}
            >
              確定
            </Button>
          }
          {...props}
        />
      ) : (
        <MobileStepper
          variant='dots'
          steps={0}
          position='bottom'
          // activeStep={currentStep}
          activeStep={-1}
          className={classes.stepper}
          backButton={
            currentStep <= MISSION_MIN_STEP ? (
              <Button
                size='medium'
                onClick={handleCloseMission}
                className={classes.button}
              >
                關閉
              </Button>
            ) : (
              <Button
                size='medium'
                onClick={handleBack}
                className={classes.button}
              >
                上一步
              </Button>
            )
          }
          nextButton={
            currentStep >= MISSION_MAX_STEP ? (
              <Button
                color='primary'
                size='medium'
                onClick={handleCompleteMission}
                className={classes.button}
              >
                完成
              </Button>
            ) : (
              <Button
                size='medium'
                onClick={handleNext}
                className={classes.button}
              >
                下一步
              </Button>
            )
          }
          {...props}
        />
      )}
    </>
  )
}

export default MissionStepper
