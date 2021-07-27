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
import PropTypes from 'prop-types'
import CustomDrawer from '../../../../components/CustomDrawer'
import { useUpdateTagStatus } from '../../../../utils/Mutation/updateTagStatus'
import { useTagValue } from '../../../../utils/contexts/TagContext'
import { useUserValue } from '../../../../utils/contexts/UserContext'

function ChangeStatus(props) {
  const { stateDrawer, tagDetail, setStateDrawer, status } = props
  const [temporaryTagState, setTemporaryTagState] = useState(
    tagDetail.status.statusName
  )
  const { fetchTagDetail } = useTagValue()
  const { token } = useUserValue()
  const [loading, setLoading] = useState(false)
  const resetTemporaryTagState = () => {
    setTemporaryTagState(tagDetail.status.statusName)
  }
  const [newDescription, setNewDescription] = useState(
    tagDetail.status.description
  )
  const handleChangeDescription = (event) => {
    setNewDescription(event.target.value)
  }
  const handleDrawerClose = () => {
    setStateDrawer(false)
    resetTemporaryTagState()
  }
  const { updateStatus } = useUpdateTagStatus()
  const handleDrawerComplete = async () => {
    setLoading(true)
    if (token) {
      try {
        await updateStatus({
          context: {
            headers: {
              authorization: token ? `Bearer ${token}` : ''
            }
          },
          variables: {
            tagId: tagDetail.id,
            statusName: temporaryTagState,
            description: newDescription
          }
        })
        await fetchTagDetail()
        setLoading(false)
        setStateDrawer(false)
      } catch (err) {
        console.error(err)
        setLoading(false)
        setStateDrawer(false)
      }
    }
  }
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
                    <img
                      src={
                        item.statusName === temporaryTagState
                          ? item.statusOnIcon
                          : item.statusIcon
                      }
                      alt=''
                    />
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
                    placeholder={tagDetail.status.description}
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
  tagDetail: PropTypes.object.isRequired,
  setStateDrawer: PropTypes.func.isRequired,
  status: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default ChangeStatus
