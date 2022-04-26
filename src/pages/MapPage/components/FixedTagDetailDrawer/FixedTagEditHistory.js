import React from 'react'
import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  makeStyles,
  List,
  ListItem,
  ListItemIcon,
  Button,
  Box,
  ListItemSecondaryAction
} from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import moment from 'moment'
import noImage from '../../../../assets/images/no-image.svg'
import { fixedTagStatus } from '../../../../constants/fixedTagContext'

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative'
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  },
  clickableFont: {
    fontSize: '0.9em',
    color: 'gray'
  },
  datetitle: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: '28px',
    lineHeight: '33px',
    color: '#000000',
    display: 'flex',
    alignItems: 'center',
    letterSpacing: '0.75px',
    textTransform: 'uppercase',
    paddingTop: '5px',
    paddingBottom: '5px'
  }
}))

const EditHistory = (props) => {
  const classes = useStyles()
  const { openHistory, handleHistoryClose, fixedTagSubLocation } = props
  const findStatusIndex = (statusName) => {
    if (statusName === fixedTagStatus[0].statusName) {
      return fixedTagStatus[0]
    }
    if (statusName === fixedTagStatus[1].statusName) {
      return fixedTagStatus[1]
    }
    if (statusName === fixedTagStatus[2].statusName) {
      return fixedTagStatus[2]
    }
    if (statusName === fixedTagStatus[3].statusName) {
      return fixedTagStatus[3]
    }
    if (statusName === fixedTagStatus[4].statusName) {
      return fixedTagStatus[4]
    }
    return fixedTagStatus[5]
  }
  const compareDayTime = (time) => {
    const tagTime = moment(time, 'YYYY-MM-DD h:mm')
    const nowTime = moment()
    return moment.duration(nowTime.diff(tagTime)).as('day') < 1
  }
  const compareWeekTime = (time) => {
    const tagTime = moment(time, 'YYYY-MM-DD h:mm')
    const nowTime = moment()
    return (
      moment.duration(nowTime.diff(tagTime)).as('day') < 7 &&
      moment.duration(nowTime.diff(tagTime)).as('day') > 1
    )
  }
  return (
    <Dialog fullScreen open={openHistory} onClose={handleHistoryClose}>
      <AppBar position='sticky'>
        <Toolbar>
          <IconButton edge='start' onClick={handleHistoryClose}>
            <ArrowBackIcon style={{ color: 'ffffff' }} />
          </IconButton>
          <Typography variant='h6' style={{ color: '#ffffff' }}>
            {fixedTagSubLocation.type !== 'floor'
              ? fixedTagSubLocation.name
              : `${fixedTagSubLocation.floor} 公共區域`}
          </Typography>
        </Toolbar>
      </AppBar>
      <div
        style={{
          width: '100%',
          height: '46%',
          overflowX: 'scroll',
          overflowY: 'hidden',
          display: '-webkit-flex',
          flexDirection: 'row'
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            flexShrink: '0',
            overflow: 'hidden',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: `url(${noImage})`
          }}
        />
      </div>
      <div
        style={{
          width: '100%',
          height: '14%',
          borderBottom: 'solid 0.5px lightgray',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div
          style={{
            height: '55px',
            fontFamily: 'Roboto',
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: '24px',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '10px',
            border:
              '1.5px solid findStatusIndex(fixedTagSubLocation.status.statusName).color',
            boxSizing: 'border-box',
            borderRadius: '5px',
            backgroundColor: findStatusIndex(
              fixedTagSubLocation.status.statusName
            ).color
          }}
        >
          <img
            src={findStatusIndex(fixedTagSubLocation.status.statusName).bigImg}
            alt=''
            style={{ paddingRight: '8px' }}
          />
          {fixedTagSubLocation.status.statusName}
        </div>
      </div>

      <List
        component='nav'
        style={{
          overflowY: 'auto',
          height: '40%',
          width: '95%',
          paddingLeft: '5%'
        }}
      >
        <Typography className={classes.datetitle}>今天</Typography>
        {fixedTagSubLocation.statusHistory.statusList.map((history) => {
          if (compareDayTime(history.createTime)) {
            return (
              <div key={history.statusName + history.createTime}>
                <ListItem>
                  <Box
                    display='flex'
                    flexDirection='column'
                    alignItems='flex-start'
                  >
                    <Box className={classes.clickableFont}>
                      {history.createUser ? (
                        <>{history.createUser.displayName} 編輯於</>
                      ) : (
                        <>編輯於</>
                      )}
                    </Box>
                    <Box className={classes.clickableFont}>
                      {history.createTime
                        ? moment(history.createTime).fromNow()
                        : ''}
                    </Box>
                  </Box>
                  <ListItemSecondaryAction>
                    <ListItemIcon>
                      <Button
                        style={{
                          backgroundColor: findStatusIndex(history.statusName)
                            .color
                        }}
                      >
                        <img
                          src={findStatusIndex(history.statusName).img}
                          alt=''
                          style={{ paddingRight: '8px' }}
                        />
                        {history.statusName}
                      </Button>
                    </ListItemIcon>
                  </ListItemSecondaryAction>
                </ListItem>
              </div>
            )
          }
          return <React.Fragment key={history.createTime}> </React.Fragment>
        })}
        <Typography className={classes.datetitle}>過去七天記錄</Typography>
        {fixedTagSubLocation.statusHistory.statusList.map((history) => {
          if (compareWeekTime(history.createTime)) {
            return (
              <div key={history.statusName + history.createTime}>
                <ListItem>
                  <Box
                    display='flex'
                    flexDirection='column'
                    alignItems='flex-start'
                  >
                    <Box className={classes.clickableFont}>
                      {history.createUser ? (
                        <>{history.createUser.displayName} 編輯於</>
                      ) : (
                        <>編輯於</>
                      )}
                    </Box>
                    <Box className={classes.clickableFont}>
                      {history.createTime
                        ? moment(history.createTime).fromNow()
                        : ''}
                    </Box>
                  </Box>
                  <ListItemSecondaryAction>
                    <ListItemIcon>
                      <Button
                        style={{
                          backgroundColor: findStatusIndex(history.statusName)
                            .color
                        }}
                      >
                        <img
                          src={findStatusIndex(history.statusName).img}
                          alt=''
                          style={{ paddingRight: '8px' }}
                        />
                        {history.statusName}
                      </Button>
                    </ListItemIcon>
                  </ListItemSecondaryAction>
                </ListItem>
              </div>
            )
          }
          return <React.Fragment key={history.createTime}> </React.Fragment>
        })}
      </List>
    </Dialog>
  )
}

export default EditHistory
