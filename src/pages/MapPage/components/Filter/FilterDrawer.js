import React, { useState } from 'react'
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
import { facilitySubType, missionInfo } from '../../constants/missionInfo'
import { useTagValue } from '../../contexts/TagContext'

const useStyles = makeStyles({
  drawerContent: {
    height: '40vh',
    overflow: 'scroll'
  },
  closeButton: {
    position: 'absolute',
    right: '15px'
  },
  content: {
    overflowY: 'scroll'
  }
})

const FilterDrawer = (props) => {
  console.log(facilitySubType)
  const { open, onClose } = props
  const classes = useStyles()
  const { filterTags, addFilterTags } = useTagValue()
  const [currentMission, setCurrentMission] = useState(null)
  const [currentSubmission, setCurrentSubmission] = useState(null)

  const changeCurrentMission = (mission) => {
    if (currentMission === mission) {
      setCurrentMission(null)
    } else {
      setCurrentMission(mission)
    }
    missionInfo.forEach((m) => {
      if (filterTags.indexOf(m.missionName) !== -1 && m !== mission) {
        addFilterTags(m.missionName)
      }
    })
    addFilterTags(mission.missionName)
  }

  const changeCurrentSubmission = (mission) => {
    if (currentMission === mission) {
      setCurrentSubmission(null)
    } else {
      setCurrentSubmission(mission)
    }
    addFilterTags(mission.subTypeName)
  }

  const subMission = currentMission
    ? facilitySubType[missionInfo.indexOf(currentMission)]
    : []
  const target = currentSubmission ? currentSubmission.target : []
  console.log(currentSubmission)
  return (
    <Drawer
      anchor='bottom'
      open={open}
      onClose={onClose}
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
            onClick={onClose}
          >
            <CloseIcon fontSize='medium' />
          </IconButton>
        </Toolbar>
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
                {subMission.map((discovery) => (
                  <Grid id={discovery.subTypeName} item xs={4}>
                    <Button
                      variant='contained'
                      fullWidth
                      size='small'
                      color={
                        filterTags.indexOf(discovery.subTypeName) === -1
                          ? ''
                          : 'primary'
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
                  <Grid id={discovery.targetName} item xs={4}>
                    <Button
                      variant='contained'
                      fullWidth
                      size='small'
                      color={
                        filterTags.indexOf(discovery.targetName) === -1
                          ? ''
                          : 'primary'
                      }
                      onClick={() => addFilterTags(discovery.targetName)}
                    >
                      {discovery.targetName}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </div>
    </Drawer>
  )
}

export default FilterDrawer
