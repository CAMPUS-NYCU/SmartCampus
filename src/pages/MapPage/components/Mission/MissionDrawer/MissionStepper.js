import React, { useState } from 'react'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import MobileStepper from '@material-ui/core/MobileStepper'
import { makeStyles } from '@material-ui/core/styles'
import { Dialog, DialogTitle } from '@material-ui/core'
import {
  MISSION_MAX_STEP,
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
    filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
    background: '#EEEEEE',
    border: '1px solid #E8E8E8',
    boxSizing: 'border-box',
    borderRadius: '20px'
  },
  finishDialog: {
    background: 'red',
    boxShadow: `0px 2px 4px rgba(0, 0, 0, 0.14), 0px 3px 4px rgba(0, 0, 0, 0.12), 0px 1px 5px rgba(0, 0, 0, 0.2)`,
    borderRadius: `10px`
  }
})

function MissionStepper(props) {
  const classes = useStyles()
  const {
    currentStep,
    handleNext,
    handleCompleteMission,
    handleCloseStreetView,
    ableToNextStep,
    handleCompleteStreetView,
    isInEdit
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
          // activeStep={currentStep}
          activeStep={-1}
          className={classes.stepper}
          // style={{
          //   background: 'none'
          // }}
          backButton={
            <Button
              size='medium'
              onClick={handleCloseStreetView}
              className={classes.button}
            >
              取消
            </Button>
          }
          nextButton={
            <Button
              size='medium'
              onClick={handleCompleteStreetView}
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
          nextButton={
            currentStep >= MISSION_MAX_STEP ? (
              <Button
                color='primary'
                size='medium'
                disabled={!ableToNextStep}
                onClick={() => setFinishOpen(true)}
                className={classes.button}
              >
                完成
              </Button>
            ) : (
              <Button
                size='medium'
                disabled={!ableToNextStep}
                onClick={handleNext}
                className={classes.button}
              >
                {isInEdit && currentStep === MissionStep.PlaceFlagOnMap
                  ? ' 確定'
                  : '下一步'}
              </Button>
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
            boxShadow: `0px 2px 4px rgba(0, 0, 0, 0.14), 0px 3px 4px rgba(0, 0, 0, 0.12), 0px 1px 5px rgba(0, 0, 0, 0.2)`,
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
          <Button
            className={classes.finishButton}
            onClick={() => {
              setFinishOpen(false)
            }}
          >
            取消
          </Button>
          <Button
            className={classes.finishButton}
            onClick={handleCompleteMission}
          >
            送出
          </Button>
        </Box>
      </Dialog>
    </>
  )
}

export default MissionStepper
