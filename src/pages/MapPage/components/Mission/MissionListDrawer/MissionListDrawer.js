import React from 'react'
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Grid,
  makeStyles
} from '@material-ui/core'
import CustomDrawer from '../../../../../components/CustomDrawer'
import missionList from './missionList'

const useStyles = makeStyles(() => ({
  MissionGrid: {
    justifyContent: 'center'
  },
  MissionCard: {
    width: 'calc(100vw - 50px)',
    minHeight: '125px',
    boxShadow: 'none',
    margin: '3px 22px 3px 22px',
    backgroundColor: '#EEEEEE',
    borderRadius: '10px'
  },
  MissionHeader: {
    padding: '16px 15px 5px 15px',
    '& .MuiTypography-root': {
      fontSize: '14px',
      fontWeight: 'bold'
    }
  },
  MissionContent: {
    padding: '0px 15px 16px 15px'
  },
  MissionContentTypography: {
    fontSize: '12px'
  }
}))

const MissionList = (props) => {
  const { open, onClose } = props
  const classes = useStyles()

  return (
    <CustomDrawer
      open={open}
      handleClose={onClose}
      partHeight
      closeButton
      title='任務清單'
    >
      <Grid container className={classes.MissionGrid}>
        {missionList.map((mission) => (
          <Card
            className={classes.MissionCard}
            variant='outlined'
            key={mission.title}
          >
            <CardHeader
              className={classes.MissionHeader}
              title={mission.title}
            />
            <CardContent className={classes.MissionContent}>
              <Typography className={classes.MissionContentTypography}>
                {mission.detail}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Grid>
    </CustomDrawer>
  )
}

export default MissionList
