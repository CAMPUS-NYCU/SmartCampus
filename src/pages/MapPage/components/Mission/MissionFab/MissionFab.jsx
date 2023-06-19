import React from 'react'
// import { makeStyles } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'
import AddSharpIcon from '@mui/icons-material/AddSharp'
import { Fab } from '@mui/material'
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
  )
}

export default MissionFab
