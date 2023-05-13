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
import ClickTimer from '../../../../../../components/ClickTimer/ClickTimer'
import clickTimerType from '../../../../../../components/ClickTimer/clickTimerType'
import { missionInfo } from '../../../../../../constants/missionInfo'
import Mission1 from '../../../../../../assets/images/mission1.svg'
import Mission2 from '../../../../../../assets/images/mission2.svg'
import Mission3 from '../../../../../../assets/images/mission3.svg'
import { useMissionValue } from '../../../../../../utils/contexts/MissionContext'

const useStyles = makeStyles(() => ({
  primaryText: {
    fontSize: '18px',
    color: 'black'
  },
  secondaryText: {
    fontSize: '10px',
    color: 'black'
  }
}))

const MissionStep0 = () => {
  const missionImage = useMemo(() => [Mission1, Mission2, Mission3], [])
  const { handleChangeMissionType } = useMissionValue()
  const listBackgroundColor = ['#90CAF9', '#CE93D8', '#FDCC4F']
  const classes = useStyles()
  return (
    <List>
      {missionInfo.map((item, index) => (
        <ClickTimer
          type={clickTimerType.Extend}
          data={{ key: 'name', value: item.missionName }}
          key={item.missionName}
        >
          <ListItem
            onClick={() => handleChangeMissionType(index)}
            button
            key={item.missionName}
            style={{
              borderRadius: '8px',
              backgroundColor: listBackgroundColor[index],
              marginBottom: '20px',
              padding: '4px'
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
              classes={{
                primary: classes.primaryText,
                secondary: classes.secondaryText
              }}
              primary={item.missionName}
              secondary={item.missionDescription}
            />
          </ListItem>
        </ClickTimer>
      ))}
    </List>
  )
}

export default MissionStep0
