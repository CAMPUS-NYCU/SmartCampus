import React from 'react'
import {
  Drawer,
  Toolbar,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Grid
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { useTagValue } from '../../contexts/TagContext'
import Mission1 from '../../../../assets/images/mission1.svg'
import Mission2 from '../../../../assets/images/mission2.svg'
import Mission3 from '../../../../assets/images/mission3.svg'

const ReportHistory = (props) => {
  const {
    control: { open, setClose }
  } = props
  const { tags } = useTagValue()
  const missionImages = [Mission1, Mission2, Mission3]
  console.log(tags)
  return (
    <Drawer
      anchor='bottom'
      variant='persistent'
      open={open}
      onClose={setClose}
      PaperProps={{
        style: {
          borderRadius: '20px 20px 0 0',
          backgroundColor: '#FAFAFA'
        }
      }}
    >
      <div style={{ height: '50vh' }}>
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
        {tags.map((item) => {
          return (
            <>
              <List>
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
                    <Grid item>{item.locationName}</Grid>
                  </Grid>
                </ListItem>
              </List>
              <Divider variant='middle' />
            </>
          )
        })}
        {tags.map((item) => {
          return (
            <>
              <List>
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
                    <Grid item>{item.locationName}</Grid>
                  </Grid>
                </ListItem>
              </List>
              <Divider variant='middle' />
            </>
          )
        })}
      </div>
    </Drawer>
  )
}

export default ReportHistory
