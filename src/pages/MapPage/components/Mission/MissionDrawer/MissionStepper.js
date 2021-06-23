import React, { useState } from 'react'

import Box from '@material-ui/core/Box'
import MobileStepper from '@material-ui/core/MobileStepper'
import { makeStyles } from '@material-ui/core/styles'
import { Dialog, DialogTitle } from '@material-ui/core'
import {
  MISSION_MAX_STEP,
  useMissionValue,
  MissionStep
} from '../../../../../utils/contexts/MissionContext'
import CustomButton from 'components/CustomButton'

const useStyles = makeStyles((theme) => ({
  stepper: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      maxWidth: '400px'
    }
    // backgroundColor: 'rgba(0,0,0,0)' // 不要預設的灰底
  },
  streetStepper: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    background: 'none'
  },
  button: {
    minWidth: 80,
    color: '#FDCC4F'
  },
  finishButton: {
    background: '#EEEEEE',
    boxSizing: 'border-box',
    borderRadius: '20px'
  },
  finishDialog: {
    background: 'red',
    boxShadow: `0px 2px 4px rgba(0, 0, 0, 0.14), 0px 3px 4px rgba(0, 0, 0, 0.12), 0px 1px 5px rgba(0, 0, 0, 0.2)`,
    borderRadius: `10px`
  }
}))
function MissionStepper(props) {
  const classes = useStyles()
  const {
    currentStep,
    handleNext,
    handleCompleteMission,
    handleCloseStreetView,
    ableToNextStep,
    handleCompleteStreetView,
    isInEdit,
    setRemindOpen
  } = useMissionValue()
  const { PlaceFlagOnStreet } = MissionStep
  const [finishOpen, setFinishOpen] = useState(false)
  return (
    <>
      {currentStep === PlaceFlagOnStreet ? (
        <MobileStepper
          variant='dots'
          steps={0}
          position='bottom'
          activeStep={-1}
          className={classes.stepper}
          backButton={
            <CustomButton
              className={classes.button}
              size='medium'
              onClick={handleCloseStreetView}
              children='取消'
              noShadow='true'
            ></CustomButton>
          }
          nextButton={
            <CustomButton
              className={classes.button}
              size='medium'
              onClick={handleCompleteStreetView}
              children='確定'
              noShadow='true'
            ></CustomButton>
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
          nextButton={
            currentStep >= MISSION_MAX_STEP ? (
              <CustomButton
                color='primary'
                className={classes.button}
                size='medium'
                onClick={
                  ableToNextStep === true
                  ? () => setFinishOpen(true)
                  : () => setRemindOpen(true)
                  }
                children='確定'
                noShadow='true'
              ></CustomButton>
            ) : (
              <CustomButton
                className={classes.button}
                size='medium'
                disabled={!ableToNextStep}
                onClick={handleNext}
                noShadow='true'
              >
                {isInEdit && currentStep === MissionStep.PlaceFlagOnMap
                  ? ' 確定'
                  : '下一步'}
              </CustomButton>
            )
          }
          {...props}
        />
      )}
      <Dialog
        open={finishOpen}
        PaperProps={{
          style: {
            background: 'r #FAFAFA',
            boxShadow: `0px 2px 4px rgba(0, 0, 0, 0.12), 0px 3px 4px rgba(0, 0, 0, 0.12), 0px 1px 5px rgba(0, 0, 0, 0.2)`,
            borderRadius: `10px`
          }
        }}
      >
        <DialogTitle>確定完成任務並送出？</DialogTitle>
        <Box
          width='100%'
          mb={2}
          mt={3}
          display='flex'
          justifyContent='space-around'
        >
          <CustomButton
            className={classes.finishButton}
            onClick={() => {
              setFinishOpen(false)
            }}
            children='取消'
          ></CustomButton>
          <CustomButton
            className={classes.finishButton}
            onClick={handleCompleteMission}
            children='送出'
          ></CustomButton>
        </Box>
      </Dialog>
    </>
  )
}
export default MissionStepper
