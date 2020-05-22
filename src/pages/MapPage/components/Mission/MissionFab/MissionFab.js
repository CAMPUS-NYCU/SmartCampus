import React from 'react'

import AddLocationIcon from '@material-ui/icons/AddLocation'
import Fab from '@material-ui/core/Fab'
import { makeStyles } from '@material-ui/core/styles'

import { useMissionValue } from '../../../contexts/MissionContext'

const useStyles = makeStyles((theme) => ({
  missionFab: {
    position: 'absolute',
    bottom: theme.spacing(4),
    left: 'calc(50vw - 28px)'
  }
}))

const MissionFab = React.forwardRef((props, ref) => {
  const { handleStartMission } = useMissionValue()
  const classes = useStyles()
  return (
    <Fab
      color='primary'
      aria-label='mission'
      size='large'
      className={classes.missionFab}
      onClick={handleStartMission}
      ref={ref}
      {...props}
    >
      <AddLocationIcon fontSize='large' />
    </Fab>
  )
})

export default MissionFab
