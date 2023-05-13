import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AddSharpIcon from '@material-ui/icons/AddSharp'
import { Fab } from '@material-ui/core'
import ClickTimer from 'components/ClickTimer/ClickTimer'
import clickTimerType from 'components/ClickTimer/clickTimerType'
import { useMissionValue } from '../../../../../utils/contexts/MissionContext'
import { useUserValue } from '../../../../../utils/contexts/UserContext'

const useStyles = makeStyles((theme) => ({
  missionFab: {
    position: 'fixed',
    bottom: theme.spacing(4),
    left: 'calc(50vw - 28px)'
  }
}))

const MissionFab = () => {
  const { handleStartMission } = useMissionValue()
  const { isGuest, signOut } = useUserValue()
  const classes = useStyles()
  return (
    <ClickTimer type={clickTimerType.Create}>
      <Fab
        className={classes.missionFab}
        display='flex'
        color='primary'
        onClick={isGuest ? signOut : handleStartMission}
        style={{
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
        }}
      >
        <AddSharpIcon fontSize='large' style={{ color: '#FFFFFF' }} />
      </Fab>
    </ClickTimer>
  )
}

export default MissionFab
