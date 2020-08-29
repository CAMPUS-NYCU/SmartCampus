import React, { useState, useEffect } from 'react'
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  DialogActions,
  Drawer,
  DialogTitle,
  Typography,
  IconButton,
  Dialog,
  CircularProgress
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import WaitIcon from '../../../../assets/images/wait.svg'
import SolvedIcon from '../../../../assets/images/solved.svg'
import { useUpdateTagStatus } from '../../Mutation/updateTagStatus'
import { useTagValue } from '../../contexts/TagContext'

function ChangeStatus(props) {
  const { stateDrawer, activeTag, setStateDrawer, classes, status } = props
  const [temporaryTagState, setTemporaryTagState] = useState(
    activeTag.status.statusName
  )
  const { updateTagList, refetch } = useTagValue()
  const [loading, setLoading] = useState(false)
  const resetTemporaryTagState = () => {
    setTemporaryTagState(activeTag.status.statusName)
  }
  const handleDrawerClose = () => {
    setStateDrawer(false)
    resetTemporaryTagState()
  }
  const { updateStatus } = useUpdateTagStatus()
  const HandleDrawerComplete = () => {
    setLoading(true)
    updateStatus({
      variables: {
        tagId: activeTag.id,
        statusName: temporaryTagState
      }
    }).then(() => {
      refetch().then((data) => {
        console.log(data)
        updateTagList(data.data)
        setLoading(false)
        setStateDrawer(false)
      })
    })
  }
  const images = [WaitIcon, SolvedIcon, SolvedIcon]
  return (
    <>
      <Drawer
        anchor='bottom'
        open={stateDrawer}
        onclose={() => setStateDrawer(false)}
      >
        <DialogTitle disableTypography>
          <Typography variant='h5'>選擇目前狀態</Typography>
          <IconButton
            aria-label='close'
            className={classes.closeButton}
            onClick={() => handleDrawerClose()}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Box
          display='flex'
          width='100vw'
          flexDirection='column'
          justifyContent='space-around'
        >
          <List component='nav'>
            {status.map((item, index) => (
              <>
                <ListItem
                  button
                  onClick={() => setTemporaryTagState(item.statusName)}
                >
                  <ListItemIcon>
                    <img src={images[index]} alt='' />
                  </ListItemIcon>
                  <ListItemText
                    primary={item.statusName}
                    style={{
                      color:
                        item.statusName === temporaryTagState
                          ? item.statusColor
                          : `black`
                    }}
                  />
                </ListItem>
                {index !== status.length - 1 && <Divider variant='middle' />}
              </>
            ))}
          </List>
          <DialogActions>
            <Button
              style={{ color: '#FDCC4F' }}
              onClick={() => HandleDrawerComplete()}
            >
              確定
            </Button>
          </DialogActions>
        </Box>
      </Drawer>
      <Dialog
        open={loading}
        PaperProps={{
          style: {
            backgroundColor: 'transparent',
            boxShadow: 'none',
            width: '50px',
            height: '50px'
          }
        }}
      >
        <CircularProgress />
      </Dialog>
    </>
  )
}

export default ChangeStatus
