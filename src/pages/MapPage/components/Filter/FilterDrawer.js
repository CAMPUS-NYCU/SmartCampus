import React, { useState } from 'react'
import { makeStyles, Typography, Grid, Button, Box } from '@material-ui/core'
import PropTypes from 'prop-types'

import CustomDrawer from '../../../../components/CustomDrawer'
import { facilitySubType, missionInfo } from '../../../../constants/missionInfo'
import { useTagValue } from '../../../../utils/contexts/TagContext'

const useStyles = makeStyles({
  content: {
    overflowY: 'scroll'
  },
  button: {
    position: 'absolute',
    bottom: '20px',
    left: '10%',
    width: '80%',
    borderRadius: '20px'
  }
})

const FilterDrawer = (props) => {
  const { open, onClose } = props
  const classes = useStyles()
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
            {missionInfo.map((mission) => (
              <Grid key={mission.missionName} item xs={4}>
                <Button
                  variant='contained'
                  fullWidth
                  size='small'
                  color={currentMission !== mission ? 'default' : 'primary'}
                  onClick={() => {
                    changeCurrentMission(mission)
                  }}
                >
                  {mission.missionName}
                </Button>
              </Grid>
            ))}
            <Grid container item xs={12} direction='row'>
              <Typography variant='h6'>設施類型</Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                {subMission.map((discovery) => (
                  <Grid key={discovery.subTypeName} item xs={4}>
                    <Button
                      variant='contained'
                      fullWidth
                      size='small'
                      color={
                        currentSubmission !== discovery ? 'default' : 'primary'
                      }
                      onClick={() => changeCurrentSubmission(discovery)}
                    >
                      {discovery.subTypeName}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid container item xs={12} direction='row'>
              <Typography variant='h6'>具體設施</Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                {target.map((discovery) => (
                  <Grid key={discovery.targetName} item xs={4}>
                    <Button
                      variant='contained'
                      fullWidth
                      size='small'
                      color={
                        currentTarget !== discovery.targetName
                          ? 'default'
                          : 'primary'
                      }
                      onClick={() => changeCurrentTarget(discovery.targetName)}
                    >
                      {discovery.targetName}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Button
          className={classes.button}
          onClick={handleFinishFilter}
          color={final ? 'primary' : 'default'}
          disabled={!final}
          variant='contained'
        >
          加入
        </Button>
      </>
    </CustomDrawer>
  )
}

FilterDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

export default FilterDrawer
