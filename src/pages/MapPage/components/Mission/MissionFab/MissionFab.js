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

const useStyles = makeStyles((theme) => ({
  missionFab: {
    position: 'absolute',
    bottom: theme.spacing(4),
    width: '90vw',
    height: '220px',
    left: '5vw'
  },
  missionList: {
    background: 'white',
    boxShadow:
      '0px 2px 4px rgba(0, 0, 0, 0.14), 0px 3px 4px rgba(0, 0, 0, 0.12), 0px 1px 5px rgba(0, 0, 0, 0.2)',
    borderRadius: '10px'
  },
  secondaryText: {
    fontSize: '0.15em'
  }
}))

const MissionFab = () => {
  const { handleStartMission } = useMissionValue()
  const classes = useStyles()
  const missionImage = [Mission1, Mission2, Mission3]
  return (
    <Box
      className={classes.missionFab}
      display='flex'
      flexDirection='column'
      justifyContent='space-between'
    >
      {missionInfo.map((mission, index) => (
        <ListItem
          className={classes.missionList}
          onClick={() => handleStartMission(index)}
        >
          <ListItemIcon>
            <img
              src={missionImage[index]}
              alt=''
              style={{ height: '40px', width: '40px' }}
            />
          </ListItemIcon>
          <ListItemText
            classes={{ secondary: classes.secondaryText }}
            primary={mission.missionName}
            secondary={mission.missionDescription}
          />
          <ListItemIcon style={{ position: 'absolute', right: '-5px' }}>
            <img
              src={addIcon}
              style={{ height: '30px', width: '30px' }}
              alt=''
            />
          </ListItemIcon>
        </ListItem>
      ))}
    </Box>
  )
}

export default MissionFab
