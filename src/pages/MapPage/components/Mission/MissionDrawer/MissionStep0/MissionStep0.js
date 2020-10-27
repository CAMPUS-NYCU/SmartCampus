import React from 'react'
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles
} from '@material-ui/core'
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'
import { missionInfo } from '../../../../constants/missionInfo'
import Mission1 from '../../../../../../assets/images/mission1.svg'
import Mission2 from '../../../../../../assets/images/mission2.svg'
import Mission3 from '../../../../../../assets/images/mission3.svg'
import { useMissionValue } from '../../../../contexts/MissionContext'

const useStyles = makeStyles(() => ({
  secondaryText: {
    fontSize: '0.15em'
  }
}))

const MissionStep0 = () => {
  const missionImage = [Mission1, Mission2, Mission3]
  const { missionType, setMissionType } = useMissionValue()
  const classes = useStyles()
  return (
    <List>
      {missionInfo.map((item, index) => (
        <ListItem
          onClick={() => setMissionType(index)}
          button
          disabled={index === 2}
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
            primary={item.missionName}
            secondary={item.missionDescription}
          />
          <ListItemIcon style={{ position: 'absolute', right: '-5px' }}>
            {index === missionType ? (
              <RadioButtonCheckedIcon style={{ color: '#FFC841' }} />
            ) : (
              <RadioButtonUncheckedIcon style={{ color: '#FFC841' }} />
            )}
          </ListItemIcon>
        </ListItem>
      ))}
    </List>
  )
}

export default MissionStep0
