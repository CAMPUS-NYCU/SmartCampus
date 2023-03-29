import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AssignmentIcon from '@material-ui/icons/Assignment'
import { Fab } from '@material-ui/core'
import MissionListDrawer from '../MissionListDrawer'

const useStyles = makeStyles((theme) => ({
  missionListFab: {
    width: '45px',
    height: '45px',
    position: 'fixed',
    top: '62px',
    right: '10px'
  }
}))

const MissionListFab = () => {
  const classes = useStyles()
  const [MissionListOpen, setMissionListOpen] = useState(false)

  return (
    <>
      <Fab
        className={classes.missionListFab}
        display='flex'
        onClick={() => setMissionListOpen(true)}
        style={{
          backgroundColor: '#FFCCBC',
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
        }}
      >
        <AssignmentIcon fontSize='default' style={{ color: '#000000' }} />
      </Fab>
      <MissionListDrawer
        open={MissionListOpen}
        onClose={() => setMissionListOpen(false)}
      />
    </>
  )
}

export default MissionListFab
