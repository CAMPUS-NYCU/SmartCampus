import React, { useState, Fragment } from 'react'
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  DialogActions,
  Dialog,
  CircularProgress,
  TextField
} from '@material-ui/core'
import * as firebase from 'firebase/app'
import PropTypes from 'prop-types'

import WaitIcon from '../../../../assets/images/wait.svg'
import SolvedIcon from '../../../../assets/images/solved.svg'
import CustomDrawer from '../../../../components/CustomDrawer'
import { useUpdateTagStatus } from '../../../../utils/Mutation/updateTagStatus'
import { useTagValue } from '../../../../utils/contexts/TagContext'

function ChangeStatus(props) {
  const { stateDrawer, activeTag, setStateDrawer, status } = props
  const [temporaryTagState, setTemporaryTagState] = useState(
    activeTag.status.statusName
  )
  const { updateTagList, refetch } = useTagValue()
  const [loading, setLoading] = useState(false)
  const resetTemporaryTagState = () => {
    setTemporaryTagState(activeTag.status.statusName)
  }
  const [newDescription, setNewDescription] = useState(
    activeTag.status.description
  )
  const handleChangeDescription = (event) => {
    setNewDescription(event.target.value)
  }
  const handleDrawerClose = () => {
    setStateDrawer(false)
    resetTemporaryTagState()
  }
  const { updateStatus } = useUpdateTagStatus()
  const handleDrawerComplete = () => {
    setLoading(true)
    firebase
      .auth()
      .currentUser.getIdToken()
      .then((token) => {
        updateStatus({
          context: {
            headers: {
              authorization: token ? `Bearer ${token}` : ''
            }
          },
          variables: {
            tagId: activeTag.id,
            statusName: temporaryTagState,
            description: newDescription
          }
        }).then(() => {
          refetch().then((data) => {
            updateTagList(data.data)
            setLoading(false)
            setStateDrawer(false)
          })
        })
      })
  }
  const images = [WaitIcon, SolvedIcon, SolvedIcon]
  return (
    <>
      <CustomDrawer
        open={stateDrawer}
        handleClose={handleDrawerClose}
        closeButton
        title='選擇目前狀態'
      >
        <Box
          display='flex'
          width='100%'
          flexDirection='column'
          justifyContent='space-around'
        >
          <List component='nav'>
            {status.map((item, index) => (
              <Fragment key={item.statusName}>
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
                {item.statusName === temporaryTagState && (
                  <TextField
                    multiline
                    rows={2}
                    variant='outlined'
                    placeholder={activeTag.status.description}
                    onChange={handleChangeDescription}
                    style={{
                      width: '90%',
                      marginLeft: '5%',
                      marginBottom: '20px'
                    }}
                  />
                )}
                {index !== status.length - 1 && <Divider variant='middle' />}
              </Fragment>
            ))}
          </List>
          <DialogActions>
            <Button color='primary' onClick={() => handleDrawerComplete()}>
              確定
            </Button>
          </DialogActions>
        </Box>
      </CustomDrawer>
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

ChangeStatus.propTypes = {
  stateDrawer: PropTypes.bool.isRequired,
  activeTag: PropTypes.object.isRequired,
  setStateDrawer: PropTypes.func.isRequired,
  status: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default ChangeStatus
