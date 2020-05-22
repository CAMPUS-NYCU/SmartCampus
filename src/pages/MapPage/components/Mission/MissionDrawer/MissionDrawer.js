import React from 'react'
import classnames from 'classnames'

import Drawer from '@material-ui/core/Drawer'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'

import MissionStepper from './MissionStepper'
import MissionStep1 from './MissionStep1'
import MissionStep2 from './MissionStep2'
import MissionStep3 from './MissionStep3'
import MissionStep4 from './MissionStep4'
import MissionStep5 from './MissionStep5'
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
    height: window.innerHeight * 0.85
  }
})

function MissionDrawer(props) {
  const { isInMission, handleCloseMission } = useMissionValue()
  const classes = useStyles()

  const { currentStep } = useMissionValue()

  return (
    <Drawer
      anchor='bottom'
      variant='persistent'
      open={isInMission}
      onClose={handleCloseMission}
      {...props}
    >
      <div
        className={classnames(
          classes.drawerContent,
          currentStep >= MissionStep.SelectMission && classes.drawerContentFull
        )}
      >
        <Box p={2}>
          {currentStep === MissionStep.PlaceFlagOnMap && <MissionStep1 />}
          {currentStep === MissionStep.PlaceFlagOnStreet && <MissionStep2 />}
          {currentStep === MissionStep.SelectMission && <MissionStep3 />}
          {currentStep === MissionStep.SelectDetail && <MissionStep4 />}
          {currentStep === MissionStep.UploadPhoto && <MissionStep5 />}
        </Box>

        <MissionStepper />
      </div>
    </Drawer>
  )
}

export default MissionDrawer
