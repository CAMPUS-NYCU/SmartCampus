import React, { useState, useEffect } from 'react'

import { MobileStepper, Button, CircularProgress } from '@material-ui/core'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'
import { makeStyles } from '@material-ui/core/styles'
import * as firebase from 'firebase/app'
import { gql } from 'apollo-boost'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { useSnackbar } from 'notistack'
import GuidePageStep1 from './GuidePageStep1'
import GuidePageStep2 from './GuidePageStep2'
import GuidePageStep3 from './GuidePageStep3'
import MainPage from '../../../../components/MainPage'

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

const GET_READ_GUIDE_QUERY = gql`
  query {
    hasReadGuide
  }
`

const SET_HAS_READ_GUIDE_MUTATION = gql`
  mutation {
    setHasReadGuide
  }
`

const GuidePage = props => {
  const { step, setStep, handleNext, handleBack, guest, width } = props
  const [token, setToken] = useState('')
  const [setHasReadGuideMutation] = useMutation(SET_HAS_READ_GUIDE_MUTATION)
  const [hasReadGuide, setHasReadGuide] = useState(null)
  const { enqueueSnackbar } = useSnackbar()

  const { data, refetch } = useQuery(GET_READ_GUIDE_QUERY, {
    context: {
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    },
    fetchPolicy: 'no-cache',
    onCompleted: () => {
      setHasReadGuide(data.hasReadGuide)
    }
  })
  if (firebase.auth().currentUser && hasReadGuide === null) {
    firebase
      .auth()
      .currentUser.getIdToken()
      .then(t => {
        setToken(t)
        refetch().then(data => {
          if (data.data) {
            setHasReadGuide(data.data.hasReadGuide)
            if (!data.data.hasReadGuide) {
              setHasReadGuideMutation({
                context: {
                  headers: {
                    authorization: token ? `Bearer ${token}` : ''
                  }
                }
              })
              if (isWidthUp('sm', width)) {
                enqueueSnackbar('功能介紹目前只能在手機上瀏覽')
                setStep(3)
              }
            } else {
              setStep(3)
            }
          }
        })
      })
  }
  useEffect(() => {
    console.log('hi')
    if (isWidthUp('sm', width)) {
      enqueueSnackbar('功能介紹目前只能在手機上瀏覽', { variant: 'warning' })
      setStep(3)
    }
  }, [hasReadGuide, setStep, width, enqueueSnackbar, step])
  return hasReadGuide === null && !guest ? (
    <LoadingPage />
  ) : (
    <GuidePageContent
      step={step}
      handleNext={handleNext}
      handleBack={handleBack}
    />
  )
}

const LoadingPage = () => {
  return (
    <>
      <div
        style={{
          background: 'rgba(0.5,0.5,0.5, 0.5)',
          height: 'calc(var(--vh, 1vh)*100)',
          width: '100vw',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <CircularProgress />
      </div>
      <div
        style={{
          background: 'white',
          height: 'calc(var(--vh, 1vh)*100)',
          width: '100vw',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 1
        }}
      >
        <MainPage />
      </div>
    </>
  )
}

const GuidePageContent = props => {
  const classes = useStyles()
  const { step, handleNext, handleBack } = props
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

export default withWidth()(GuidePage)
