import React from 'react'
import { makeStyles } from '@mui/styles'
import Box from '@mui/material/Box'

import MissionStepper from './MissionStepper'
import MissionStep1 from './MissionStep1'
import MissionStep2 from './MissionStep2'
import {
  MissionStep,
  useMissionValue
} from '../../../../../utils/contexts/MissionContext'
import CustomDrawer from '../../../../../components/CustomDrawer'

const useStyles = makeStyles(() => ({
  missionContent: {
    backgroundColor: '#FAFAFA',
    paddingBottom: 64 // 48px stepper高度 + (2 * theme spacing)
  }
}))

function MissionDrawer() {
  const { isInMission, handleCloseMission, handleBack, isInEdit } =
    useMissionValue()
  const classes = useStyles()
  const { currentStep } = useMissionValue()

  const getDrawerTitle = () => {
    if (isInEdit && currentStep === MissionStep.PlaceFlagOnMap) {
      return '更改座標位置'
    }
    if (isInEdit) {
      return '編輯回報紀錄'
    }
    return `標註`
  }
  return (
    <>
      {isInMission && currentStep !== MissionStep.PlaceFlagOnStreet ? (
        <CustomDrawer
          open={isInMission}
          handleClose={handleCloseMission}
          handleBack={handleBack}
          fullHeight={currentStep === MissionStep.SelectMission}
          title={getDrawerTitle()}
          variant='persistent'
        >
          <>
            <Box px={2} py={1} className={classes.missionContent}>
              {currentStep === MissionStep.PlaceFlagOnMap && <MissionStep1 />}
              {currentStep === MissionStep.SelectMission && <MissionStep2 />}
            </Box>
            <MissionStepper />
          </>
        </CustomDrawer>
      ) : (
        <>
          {currentStep === MissionStep.PlaceFlagOnStreet && <MissionStepper />}
        </>
      )}
    </>
  )
}

export default MissionDrawer
