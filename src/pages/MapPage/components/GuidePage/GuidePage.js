import React from 'react'

import { MobileStepper, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import GuidePageStep1 from './GuidePageStep1'
import GuidePageStep2 from './GuidePageStep2'
import GuidePageStep3 from './GuidePageStep3'

const useStyles = makeStyles({
  streetStepper: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    background: 'none'
  },
  button: {
    zIndex: 3,
    color: '#ffffff'
  }
})

const GuidePage = (props) => {
  const classes = useStyles()
  const {step, handleNext, handleBack} = props
  console.log(step)
  return step <= 2 ? (
    <>
      {step === 0 && <GuidePageStep1 />}
      {step === 1 && <GuidePageStep2 />}
      {step === 2 && <GuidePageStep3 />}
      <MobileStepper
        position='bottom'
        steps={0}
        activeStep={-1}
        className={classes.streetStepper}
        backButton={
          step !== 0 && (
            <Button
              className={classes.button}
              size='large'
              onClick={handleBack}
            >
              上一頁
            </Button>
          )
        }
        nextButton={
          step === 2 ? (
            <Button
              className={classes.button}
              size='large'
              onClick={handleNext}
            >
              完成
            </Button>
          ) : (
            <Button
              className={classes.button}
              size='large'
              onClick={handleNext}
            >
              下一頁
            </Button>
          )
        }
      />
    </>
  ) : (
    <></>
  )
}

export default GuidePage
