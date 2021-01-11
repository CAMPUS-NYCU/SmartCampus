import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@material-ui/core'
import { missionGuide } from '../../constants/missionInfo'
import Mission1 from '../../../../assets/images/mission1circle.svg'
import Mission2 from '../../../../assets/images/mission2circle.svg'
import Mission3 from '../../../../assets/images/mission3circle.svg'

const useStyles = makeStyles({
  container: {
    backgroundColor: 'rgba(0.5,0.5,0.5, 0.5)',
    width: '100vw',
    height: 'calc(var(--vh, 1vh)*100)',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  secondaryText: {
    fontSize: '0.5em',
    color: 'white'
  }
})

export default function GuidePageStep2() {
  const missionImage = [Mission1, Mission2, Mission3]
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <Typography
        variant='h6'
        style={{ position: 'absolute', left: 30, top: 30, color: 'white' }}
      >
        功能說明
      </Typography>
      <List>
        {missionGuide.map((item, index) => (
          <ListItem>
            <ListItemIcon>
              <img
                src={missionImage[index]}
                alt=''
                style={{ height: '50px', width: '50px' }}
              />
            </ListItemIcon>
            <ListItemText
              classes={{ secondary: classes.secondaryText }}
              primary={item.missionName}
              secondary={item.missionDescription}
              style={{ color: 'white', fontSize: '2em' }}
            />
          </ListItem>
        ))}
      </List>
    </div>
  )
}
