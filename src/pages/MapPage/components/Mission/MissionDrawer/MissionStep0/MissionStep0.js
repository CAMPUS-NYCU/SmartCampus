import React, { useMemo } from 'react'
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles
} from '@material-ui/core'
// import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked'
// import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'
// import { BorderAllRounded } from '@material-ui/icons'
import { missionInfo } from '../../../../../../constants/missionInfo'
import Mission1 from '../../../../../../assets/images/mission1.svg'
import Mission2 from '../../../../../../assets/images/mission2.svg'
import Mission3 from '../../../../../../assets/images/mission3.svg'
import { useMissionValue } from '../../../../../../utils/contexts/MissionContext'

const useStyles = makeStyles(() => ({
  secondaryText: {
    fontSize: '10px'
  }
}))

const MissionStep0 = () => {
  const missionImage = useMemo(() => [Mission1, Mission2, Mission3], [])
  const { handleChangeMissionType } = useMissionValue()
  const listBackgroundColor = ['#42A5F5', '#AB47BC', '#FFC107']
  const classes = useStyles()
  return (
    <List>
      {missionInfo.map((item, index) => (
        <ListItem
          onClick={() => handleChangeMissionType(index)}
          button
          key={item.missionName}
          style={{
            borderRadius: '8px',
            borderWidth: '2px',
            borderStyle: 'solid',
            borderColor: listBackgroundColor[index],
            marginBottom: '20px',
            padding: '6px',
            color: listBackgroundColor[index]
          }}
        >
          <ListItemIcon>
            <img
              src={missionImage[index]}
              alt=''
              style={{ marginLeft: '6px', height: '40px', width: '40px' }}
            />
          </ListItemIcon>
          <ListItemText
            style={{ maxWidth: '85%' }}
            classes={{ secondary: classes.secondaryText }}
            primary={item.missionName}
            secondary={item.missionDescription}
          />
        </ListItem>
      ))}
    </List>
  )
}

export default MissionStep0
