import React from 'react'
import classnames from 'classnames'

import Drawer from '@material-ui/core/Drawer'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import { Toolbar, IconButton } from '@material-ui/core'
import MissionStepper from './MissionStepper'
import MissionStep1 from './MissionStep1'
import MissionStep2 from './MissionStep2'
import MissionStep0 from './MissionStep0'
import { MissionStep, useMissionValue } from '../../../contexts/MissionContext'
import { missionInfo } from '../../../constants/missionInfo'

const useStyles = makeStyles({
  drawerContent: {
    minHeight: 150,
    height: window.innerHeight * 0.2,
    transitionProperty: 'height min-height',
    transitionDuration: '0.3s',
    width: '100%'
  },
  drawerContentFull: {
    minHeight: 450,
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

  const { currentStep, missionType } = useMissionValue()
  return (
    <>
      {isInMission && currentStep !== MissionStep.PlaceFlagOnStreet ? (
        <Drawer
          anchor='bottom'
          variant='persistent'
          open={isInMission}
          onClose={handleCloseMission}
          PaperProps={{
            style: {
              borderRadius: '20px 20px 0 0',
              backgroundColor: '#FAFAFA'
            }
          }}
          {...props}
        >
          <div
            className={classnames(
              currentStep === MissionStep.SelectMission &&
                classes.drawerContentFull
            )}
          >
            <Toolbar>
              <Typography variant='h6'>
                {currentStep === MissionStep.selectMissionName
                  ? `選擇要標注的任務`
                  : `標註${missionInfo[missionType].missionName}`}
              </Typography>
              <IconButton
                style={{ position: 'absolute', right: '10px' }}
                edge='start'
                aria-label='close'
                onClick={handleCloseMission}
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
            <Box px={2} py={1} className={classes.missionContent}>
              {currentStep === MissionStep.PlaceFlagOnMap && <MissionStep1 />}
              {currentStep === MissionStep.selectMissionName && (
                <MissionStep0 />
              )}
              {currentStep === MissionStep.SelectMission && <MissionStep2 />}
            </Box>
            <MissionStepper />
          </div>
        </Drawer>
      ) : (
        <>
          {currentStep === MissionStep.PlaceFlagOnStreet && <MissionStepper />}
        </>
      )}
    </>
  )
}

export default MissionDrawer
