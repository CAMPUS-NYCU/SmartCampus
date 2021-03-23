import React, { useState } from 'react'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'
import {
  Drawer,
  makeStyles,
  Toolbar,
  Typography,
  IconButton,
  Grid,
  Button,
  Box
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { facilitySubType, missionInfo } from '../../pages/MapPage/constants/missionInfo'
import { useTagValue } from '../../pages/MapPage/contexts/TagContext'

const useStyles = makeStyles({
  drawerContent: {
    height: '80vh',
    overflow: 'scroll'
  },
  closeButton: {
    position: 'absolute',
    right: '15px'
  },
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

const FilterDrawer = props => {
  const { open, onClose, width } = props
  const classes = useStyles()
  const { addFilterTags } = useTagValue()
  const [currentMission, setCurrentMission] = useState(null)
  const [currentSubmission, setCurrentSubmission] = useState(null)
  const [currentTarget, setCurrentTarget] = useState(null)

  const subMission = currentMission
    ? facilitySubType[missionInfo.indexOf(currentMission)]
    : []
  const target = currentSubmission ? currentSubmission.target : []
  const final = currentMission
    ? currentSubmission
      ? currentTarget
        ? currentTarget
        : currentSubmission.subTypeName
      : currentMission.missionName
    : null

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
  const changeCurrentMission = mission => {
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

  const changeCurrentSubmission = mission => {
    if (currentSubmission === mission) {
      setCurrentSubmission(null)
      setCurrentTarget(null)
    } else {
      setCurrentSubmission(mission)
      setCurrentTarget(null)
    }
  }

  const changeCurrentTarget = target => {
    if (currentTarget === target) {
      setCurrentTarget(null)
    } else {
      setCurrentTarget(target)
    }
  }

  return (
    <Drawer
      anchor={isWidthUp('sm', width) ? 'left' : 'bottom'}
      open={open}
      onClose={handleCloseFilter}
      PaperProps={{
        style: {
          borderRadius: '20px 20px 0 0',
          backgroundColor: '#FAFAFA'
        }
      }}
    >
      <div className={classes.drawerContent}>
        <Toolbar
          style={{
            position: 'sticky',
            top: '0',
            backgroundColor: '#FAFAFA',
            zIndex: 100
          }}
        >
          <Typography variant='h5'>篩選</Typography>
          <IconButton
            className={classes.closeButton}
            edge='end'
            onClick={handleCloseFilter}
          >
            <CloseIcon fontSize='medium' />
          </IconButton>
        </Toolbar>
        <Box p={2} display='flex'>
          <Grid container spacing={2}>
            <Grid container item xs={12} direction='row'>
              <Typography variant='h6'>標註類型</Typography>
            </Grid>
            {missionInfo.map(mission => (
              <Grid key={mission.missionName} item xs={4}>
                <Button
                  variant='contained'
                  fullWidth
                  size='small'
                  color={currentMission !== mission ? '' : 'primary'}
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
                {subMission.map(discovery => (
                  <Grid id={discovery.subTypeName} item xs={4}>
                    <Button
                      variant='contained'
                      fullWidth
                      size='small'
                      color={currentSubmission !== discovery ? '' : 'primary'}
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
                {target.map(discovery => (
                  <Grid id={discovery.targetName} item xs={4}>
                    <Button
                      variant='contained'
                      fullWidth
                      size='small'
                      color={
                        currentTarget !== discovery.targetName ? '' : 'primary'
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
          color={final ? 'primary' : ''}
          disabled={!final}
          variant='contained'
        >
          加入
        </Button>
      </div>
    </Drawer>
  )
}

export default withWidth()(FilterDrawer)
