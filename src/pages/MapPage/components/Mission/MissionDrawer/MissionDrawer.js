import React from 'react'
import classnames from 'classnames'

import Drawer from '@material-ui/core/Drawer'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/IconButton'

import MissionStepper from './MissionStepper'
import MissionStep1 from './MissionStep1'
import MissionStep2 from './MissionStep2'
import MissionStep3 from './MissionStep3'
import { MissionStep, useMissionValue } from '../../../contexts/MissionContext'

const useStyles = makeStyles({
  drawerContent: {
    minHeight: 150,
    height: window.innerHeight * 0.2,
    transitionProperty: 'height min-height',
    transitionDuration: '0.3s',
    width: '100%'
  },
  drawerContentFull: {
    minHeight: 400,
    height: 'calc(var(--vh, 1vh) * 100 - 100px)'
  },
  titleBar: {
    position: 'sticky',
    top: 0,
    width: '100%',
    height: 40,
    backgroundColor: '#FAFAFA',
    zIndex: 100
  },
  missionContent: {
    backgroundColor: '#FAFAFA',
    paddingBottom: 64 // 48px stepper高度 + (2 * theme spacing)
  },
  closeButton: {
    padding: 0
  }
})

function MissionDrawer(props) {
  const { isInMission, handleCloseMission } = useMissionValue()
  const classes = useStyles()

  const { currentStep } = useMissionValue()
  console.log(props)
  return (
    <Drawer
      anchor='bottom'
      variant='persistent'
      open={isInMission}
      onClose={handleCloseMission}
      PaperProps={{
        style: {
          borderRadius: '20px 20px 0 0'
        }
      }}
      {...props}
    >
      <div
        className={classnames(
          classes.drawerContent,
          currentStep >= MissionStep.SelectMission && classes.drawerContentFull
        )}
      >
        <Box
          className={classes.titleBar}
          display='flex'
          alignItems='center'
          justifyContent='space-between'
          px={2}
        >
          <Typography variant='h6'>標註</Typography>
          <IconButton
            aria-label='close'
            onClick={handleCloseMission}
            className={classes.closeButton}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Box px={2} py={1} className={classes.missionContent}>
          {currentStep === MissionStep.PlaceFlagOnMap && <MissionStep1 />}
          {currentStep === MissionStep.PlaceFlagOnStreet && <MissionStep2 />}
          {currentStep === MissionStep.SelectMission && <MissionStep3 />}
        </Box>
        <MissionStepper />
      </div>
    </Drawer>
  )
}

export default MissionDrawer
