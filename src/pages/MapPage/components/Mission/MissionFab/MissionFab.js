import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AddSharpIcon from '@material-ui/icons/AddSharp'
import { Fab } from '@material-ui/core'
import { useMissionValue } from '../../../../../utils/contexts/MissionContext'

const useStyles = makeStyles((theme) => ({
  missionFab: {
    position: 'fixed',
    bottom: theme.spacing(4),
    left: 'calc(50vw - 28px)'
  }
}))

const MissionFab = (props) => {
  const { handleStartMission } = useMissionValue()
  const classes = useStyles()
  const { deny, guest } = props
  return (
    <Fab
      className={classes.missionFab}
      display='flex'
      color='primary'
      onClick={guest ? deny : handleStartMission}
      style={{
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
      }}
    >
      <AddSharpIcon fontSize='large' style={{ color: '#FFFFFF' }} />
    </Fab>
  )
}

export default MissionFab
