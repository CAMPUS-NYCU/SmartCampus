import React, { useState } from 'react'

import Box from '@mui/material/Box'
import MobileStepper from '@mui/material/MobileStepper'
import { makeStyles } from '@mui/styles'
import { Dialog, DialogTitle } from '@mui/material'
import CustomButton from '../../../../../components/CustomButton'
import {
  MISSION_MAX_STEP,
  useMissionValue,
  MissionStep
} from '../../../../../utils/contexts/MissionContext'

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
  let nextStepButtonName = ''
  if (currentStep === 0) {
    nextStepButtonName = ''
  } else if (isInEdit && currentStep === MissionStep.PlaceFlagOnMap) {
    nextStepButtonName = '確定'
  } else {
    nextStepButtonName = '下一步'
  }
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
              buttonType='textButton_activated'
              size='medium'
              onClick={handleCloseStreetView}
              style={{ minWidth: 80 }}
            >
              取消
            </CustomButton>
          }
          nextButton={
            <CustomButton
              buttonType='textButton_activated'
              size='medium'
              onClick={handleCompleteStreetView}
              style={{ minWidth: 80 }}
            >
              確定
            </CustomButton>
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
                buttonType='textButton_activated'
                size='medium'
                onClick={
                  ableToNextStep === true
                    ? () => setFinishOpen(true)
                    : () => setRemindOpen(true)
                }
                style={{ minWidth: 80 }}
              >
                確定
              </CustomButton>
            ) : (
              <CustomButton
                buttonType='textButton_activated'
                size='medium'
                disabled={!ableToNextStep}
                onClick={handleNext}
                style={{ minWidth: 80 }}
              >
                {nextStepButtonName}
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
        <DialogTitle>確定完成回報並送出？</DialogTitle>
        <Box
          width='100%'
          mb={2}
          mt={3}
          display='flex'
          justifyContent='space-around'
        >
          <CustomButton
            buttonType='finishButton'
            onClick={() => {
              setFinishOpen(false)
            }}
          >
            取消
          </CustomButton>
          <CustomButton
            buttonType='finishButton'
            onClick={handleCompleteMission}
          >
            送出
          </CustomButton>
        </Box>
      </Dialog>
    </>
  )
}
export default MissionStepper
