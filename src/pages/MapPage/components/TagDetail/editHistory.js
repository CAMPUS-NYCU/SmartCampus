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
  ListItemSecondaryAction,
  Divider
} from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { tagStatus } from '../../constants/tagData'

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
  const { open, handleHistoryClose, tagMissionIndex, activeTag } = props
  return (
    <Dialog fullScreen open={open} onClose={handleHistoryClose}>
      <AppBar position='sticky'>
        <Toolbar>
          <IconButton edge='start' onClick={handleHistoryClose}>
            <ArrowBackIcon style={{ color: 'ffffff' }} />
          </IconButton>
          <Typography variant='h6'>狀態編輯紀錄</Typography>
        </Toolbar>
      </AppBar>
      <List component='nav'>
        {activeTag.statusHistory.map((history) => {
          let tagStatusIndex 
          tagStatus.forEach((s) => {
            const f = s.findIndex(
              (status) => status.statusName === history.statusName
            )
            if (f !== -1) {
              tagStatusIndex = f
            }
          })
          const color = tagStatus[tagMissionIndex][tagStatusIndex].statusColor
          return (
            <>
              <ListItem style={{ marginTop: '10px' }}>
                <ListItemIcon>
                  <Button style={{ backgroundColor: `${color}` }}>
                    {history.statusName}
                  </Button>
                </ListItemIcon>
                <ListItemSecondaryAction>
                  <Box
                    display='flex'
                    flexDirection='column'
                    alignItems='flex-end'
                  >
                    <Box className={classes.clickableFont}>
                      {history.createUser.displayName}編輯
                    </Box>
                    <Box className={classes.clickableFont}>
                      {history.createTime}
                    </Box>
                  </Box>
                </ListItemSecondaryAction>
              </ListItem>
              <Box m={2.5}>{history.description}</Box>
              <Divider variant='middle' />
            </>
          )
        })}
      </List>
    </Dialog>
  )
}

export default EditHistory
