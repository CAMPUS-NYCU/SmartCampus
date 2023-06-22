import React, { useState } from 'react'
import { Typography, Grid, Box } from '@mui/material'
import PropTypes from 'prop-types'

import CustomDrawer from '../../../../components/CustomDrawer'
import { facilitySubType, missionInfo } from '../../../../constants/missionInfo'
import { useTagValue } from '../../../../utils/contexts/TagContext'
import CustomButton from '../../../../components/CustomButton'

const FilterDrawer = (props) => {
  const { open, onClose } = props
  const { addFilterTags } = useTagValue()
  const [currentMission, setCurrentMission] = useState(null)
  const [currentSubmission, setCurrentSubmission] = useState(null)
  const [currentTarget, setCurrentTarget] = useState(null)

  const subMission = currentMission
    ? facilitySubType[missionInfo.indexOf(currentMission)]
    : []
  const target = currentSubmission ? currentSubmission.target : []
  let final = null
  if (currentMission) {
    if (currentSubmission) {
      if (currentTarget) {
        final = currentTarget
      } else {
        final = currentSubmission.subTypeName
      }
    } else {
      final = currentMission.missionName
    }
  }
  const handleFinishFilter = () => {
    addFilterTags(final)
    setCurrentMission(null)
    setCurrentSubmission(null)
    setCurrentTarget(null)
    onClose()
  }
  const handleCloseFilter = () => {
    setCurrentMission(null)
    setCurrentSubmission(null)
    setCurrentTarget(null)
    onClose()
  }
  const changeCurrentMission = (mission) => {
    if (currentMission === mission) {
      setCurrentMission(null)
      setCurrentSubmission(null)
      setCurrentTarget(null)
    } else {
      setCurrentMission(mission)
      setCurrentSubmission(null)
      setCurrentTarget(null)
    }
  }

  const changeCurrentSubmission = (mission) => {
    if (currentSubmission === mission) {
      setCurrentSubmission(null)
      setCurrentTarget(null)
    } else {
      setCurrentSubmission(mission)
      setCurrentTarget(null)
    }
  }

  const changeCurrentTarget = (input) => {
    if (currentTarget === input) {
      setCurrentTarget(null)
    } else {
      setCurrentTarget(input)
    }
  }

  return (
    <CustomDrawer
      open={open}
      handleClose={handleCloseFilter}
      title='篩選'
      closeButton
      fullHeight
    >
      <>
        <Box p={2} display='flex'>
          <Grid container spacing={2}>
            <Grid container item xs={12} direction='row'>
              <Typography variant='h6'>標註類型</Typography>
            </Grid>
            {Array.isArray(missionInfo) &&
              missionInfo.map((mission) => (
                <Grid key={mission.missionName} item xs={4}>
                  <CustomButton
                    fullWidth
                    buttonType={
                      currentMission !== mission
                        ? 'boxButton_inactivated'
                        : 'boxButton_activated'
                    }
                    variant='contained'
                    size='small'
                    onClick={() => changeCurrentMission(mission)}
                  >
                    {mission.missionName}
                  </CustomButton>
                </Grid>
              ))}
            <Grid container item xs={12} direction='row'>
              <Typography variant='h6'>設施類型</Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                {Array.isArray(subMission) &&
                  subMission.map((discovery) => (
                    <Grid key={discovery.subTypeName} item xs={4}>
                      <CustomButton
                        fullWidth
                        buttonType={
                          currentSubmission !== discovery
                            ? 'boxButton_inactivated'
                            : 'boxButton_activated'
                        }
                        variant='contained'
                        size='small'
                        onClick={() => changeCurrentSubmission(discovery)}
                      >
                        {discovery.subTypeName}
                      </CustomButton>
                    </Grid>
                  ))}
              </Grid>
            </Grid>
            <Grid container item xs={12} direction='row'>
              <Typography variant='h6'>具體設施</Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                {Array.isArray(target) &&
                  target?.map((discovery) => (
                    <Grid key={discovery.targetName} item xs={4}>
                      <CustomButton
                        fullWidth
                        buttonType={
                          currentTarget !== discovery.targetName
                            ? 'boxButton_inactivated'
                            : 'boxButton_activated'
                        }
                        variant='contained'
                        size='small'
                        onClick={() =>
                          changeCurrentTarget(discovery.targetName)
                        }
                      >
                        {discovery.targetName}
                      </CustomButton>
                    </Grid>
                  ))}
              </Grid>
            </Grid>
          </Grid>
        </Box>

        <CustomButton
          buttonType={
            final ? 'roundButton_activated' : 'roundButton_inactivated'
          }
          variant='contained'
          onClick={handleFinishFilter}
          disabled={!final}
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '10%',
            width: '80%'
          }}
        >
          加入
        </CustomButton>
      </>
    </CustomDrawer>
  )
}

FilterDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

export default FilterDrawer
