import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AddSharpIcon from '@material-ui/icons/AddSharp'
import { Fab } from '@material-ui/core'
import { useMissionValue } from '../../../../../utils/contexts/MissionContext'

const useStyles = makeStyles((theme) => ({
  missionFab: {
    position: 'absolute',
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
      flexDirection='column'
      justifyContent='space-between'
      color='primary'
      onClick={guest ? deny : handleStartMission}
    >
      <AddSharpIcon fontSize='large' />
    </Fab>
  )
}

export default MissionFab
