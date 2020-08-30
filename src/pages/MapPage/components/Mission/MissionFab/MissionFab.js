import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import { useMissionValue } from '../../../contexts/MissionContext'
import Mission1 from '../../../../../assets/images/mission1.svg'
import Mission2 from '../../../../../assets/images/mission2.svg'
import Mission3 from '../../../../../assets/images/mission3.svg'
import addIcon from '../../../../../assets/images/addIcon.svg'
import { missionInfo } from '../../../constants/missionInfo'
import AddSharpIcon from '@material-ui/icons/AddSharp'
import { Fab } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  missionFab: {
    position: 'absolute',
    bottom: theme.spacing(4),
    left: 'calc(50vw - 28px)'
  }
}))

const MissionFab = () => {
  const { handleStartMission } = useMissionValue()
  const classes = useStyles()
  return (
    <Fab
      className={classes.missionFab}
      display='flex'
      flexDirection='column'
      justifyContent='space-between'
      color='primary'
      onClick={handleStartMission}
    >
      <AddSharpIcon fontSize='large' />
    </Fab>
  )
}

export default MissionFab
