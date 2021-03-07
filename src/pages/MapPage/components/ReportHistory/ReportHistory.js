import React from 'react'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'
import {
  Drawer,
  Toolbar,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  Divider,
  Grid,
  Box,
  makeStyles,
  Button,
  CircularProgress
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { useTagValue } from '../../contexts/TagContext'
import { useMissionValue } from '../../contexts/MissionContext'
import Mission1 from '../../../../assets/images/mission1.svg'
import Mission2 from '../../../../assets/images/mission2.svg'
import Mission3 from '../../../../assets/images/mission3.svg'

const useStyle = makeStyles(theme => ({
  tag: {
    background: '#FDCC4F',
    border: '1.5px solid #FFEDC0',
    boxSizing: 'border-box',
    borderRadius: '5px'
  },
  drawerPaperStyle: {
    borderRadius: '20px 20px 0 0',
    backgroundColor: '#FAFAFA',
    height: '50vh',
    [theme.breakpoints.up('sm')]: {
      width: '500px',
      height: '100vh'
    }
  }
}))

const ReportHistory = props => {
  const {
    control: { open, setClose },
    width
  } = props
  const { setActiveTagId, activeTag, userAddTags } = useTagValue()
  const { isInMission } = useMissionValue()
  const missionImages = [Mission1, Mission2, Mission3]
  const classes = useStyle()
  return (
    <Drawer
      anchor={isWidthUp('sm', width) ? 'left' : 'bottom'}
      open={open && !isInMission && !activeTag}
      onClose={setClose}
      classes={{ paper: classes.drawerPaperStyle }}
    >
      <Toolbar
        style={{
          position: 'sticky',
          top: '0',
          zIndex: '100',
          backgroundColor: '#FAFAFA'
        }}
      >
        <Typography variant='h5'>回報紀錄</Typography>
        <IconButton
          onClick={setClose}
          style={{ position: 'absolute', right: '10px' }}
        >
          <CloseIcon fontSize='large' />
        </IconButton>
      </Toolbar>
      {userAddTags ? (
        <List component='nav'>
          {userAddTags.map(item => {
            return (
              <>
                <ListItem>
                  <ListItemIcon>
                    <img
                      src={missionImages[0]}
                      alt='mission'
                      style={{ height: '35px', width: '35px' }}
                    />
                  </ListItemIcon>
                  <Grid container direction='column' space={1}>
                    <Grid
                      item
                      container
                      space={2}
                      direction='row'
                      alignItems='center'
                    >
                      <Typography variant='h6'>{item.locationName}</Typography>
                      <Typography variant='body2' color='textSecondary'>
                        {item.statusHistory[0].createTime}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      container
                      space={2}
                      direction='row'
                      alignItems='center'
                    >
                      <Box className={classes.tag} mr={1} p={0.5}>
                        {item.category.subTypeName}
                      </Box>
                      <Box className={classes.tag} mr={1} p={0.5}>
                        {item.category.targetName}
                      </Box>
                    </Grid>
                  </Grid>
                  <Button
                    color='primary'
                    variant='contained'
                    size='small'
                    onClick={() => setActiveTagId(item.id)}
                    style={{ borderRadius: '20px', color: 'black' }}
                  >
                    檢視
                  </Button>
                </ListItem>
                <Divider variant='middle' />
              </>
            )
          })}
        </List>
      ) : (
        <CircularProgress color='primary' />
      )}
    </Drawer>
  )
}

export default withWidth()(ReportHistory)
