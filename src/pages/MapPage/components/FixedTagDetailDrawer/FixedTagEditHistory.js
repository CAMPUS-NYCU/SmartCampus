import React, { useMemo, useState } from 'react'
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
  ListItemSecondaryAction,
  Divider
} from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
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
  }
}))

const EditHistory = (props) => {
  const classes = useStyles()
  const { openHistory, handleHistoryClose, fixedTagSubLocation } = props
  const testindex = useMemo(
    () =>
      fixedTagStatus.find(
        (fixedtagfloor) =>
          fixedtagfloor.statusName === fixedTagSubLocation.status.statusName
      ) || {},
    [fixedTagSubLocation]
  )
  const [nowIndex] = useState(testindex.id)
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
          height: '60%',
          flexGrow: '1',
          overflowX: 'scroll',
          overflowY: 'hidden',
          display: '-webkit-flex',
          flexDirection: 'row'
        }}
      >
        <div
          style={{
            width: '100%',
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
          height: '15%',
          borderBottom: 'solid 0.5px lightgray',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div
          style={{
            width: '60%',
            height: '55px',
            fontFamily: 'Roboto',
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: '24px',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1.5px solid fixedTagStatus[nowIndex].color',
            boxSizing: 'border-box',
            borderRadius: '5px',
            backgroundColor: fixedTagStatus[nowIndex].color
          }}
        >
          {fixedTagSubLocation.status.statusName}
        </div>
      </div>
      <List component='nav' style={{ overflowY: 'auto' }}>
        {fixedTagSubLocation.statusHistory.statusList.map((history) => {
          return (
            <div key={history.statusName + history.createTime}>
              <ListItem style={{ marginTop: '10px' }}>
                <ListItemIcon>
                  <Button>{history.statusName}</Button>
                </ListItemIcon>
                <ListItemSecondaryAction>
                  <Box
                    display='flex'
                    flexDirection='column'
                    alignItems='flex-end'
                  >
                    <Box className={classes.clickableFont}>
                      {history.createUser ? (
                        <>{history.createUser.displayName} 編輯於</>
                      ) : (
                        ''
                      )}
                    </Box>
                    <Box className={classes.clickableFont}>
                      {history.createTime ? history.createTime : ''}
                    </Box>
                  </Box>
                </ListItemSecondaryAction>
              </ListItem>
              <Box m={2.5}>{history.description}</Box>
              <Divider variant='middle' />
            </div>
          )
        })}
      </List>
    </Dialog>
  )
}

export default EditHistory
