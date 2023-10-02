import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import Box from '@mui/material/Box'
import MobileStepper from '@mui/material/MobileStepper'
import { makeStyles } from '@mui/styles'
import { Dialog, DialogTitle } from '@mui/material'
import CustomButton from '../../../../../components/CustomButton'
import {
  MISSION_MIN_STEP,
  MISSION_MAX_STEP,
  useMissionValue
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
    handleBack,
    handleNext,
    handleCompleteMission,
    ableToNextStep,
    isInEdit
  } = useMissionValue()
  const [finishOpen, setFinishOpen] = useState(false)
  const [redirect, setRedirect] = useState(false)
  const history = useHistory()

  function getBackButton() {
    if (currentStep <= MISSION_MIN_STEP) {
      return null
    }
    return (
      <CustomButton
        buttonType='textButton_activated'
        size='medium'
        onClick={handleBack}
        style={{ minWidth: 80 }}
      >
        上一步
      </CustomButton>
    )
  }

  function getNextButton() {
    if (currentStep >= MISSION_MAX_STEP) {
      return (
        <CustomButton
          buttonType='textButton_activated'
          size='medium'
          onClick={() => setFinishOpen(true)}
          style={{ minWidth: 80 }}
        >
          {isInEdit ? '完成更新' : '完成新增'}
        </CustomButton>
      )
    }
    return (
      <CustomButton
        buttonType='textButton_activated'
        size='medium'
        disabled={!ableToNextStep}
        onClick={handleNext}
        style={{ minWidth: 80 }}
      >
        下一步
      </CustomButton>
    )
  }

  const handleSubmit = React.useCallback(() => {
    handleCompleteMission().then(() => {
      setFinishOpen(false)
      setRedirect(true)
    })
  }, [handleCompleteMission])
  if (redirect) {
    history.go(0)
  }
  return (
    <>
      <MobileStepper
        variant='dots'
        steps={0}
        position='bottom'
        // activeStep={currentStep}
        activeStep={-1}
        className={classes.stepper}
        backButton={getBackButton()}
        nextButton={getNextButton()}
        {...props}
      />
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
          <CustomButton buttonType='finishButton' onClick={handleSubmit}>
            送出
          </CustomButton>
        </Box>
      </Dialog>
    </>
  )
}
export default MissionStepper
