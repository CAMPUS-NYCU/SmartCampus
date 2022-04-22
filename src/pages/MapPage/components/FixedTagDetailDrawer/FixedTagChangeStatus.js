import React, { Fragment, useState, useMemo, useEffect } from 'react'
import {
  Box,
  Button,
  Switch,
  FormGroup,
  FormControlLabel,
  List,
  ListItem,
  Dialog,
  DialogActions,
  CircularProgress
} from '@material-ui/core'
import PropTypes from 'prop-types'
import UnCrowded from '../../../../assets/images/fixedTagStatusUnCrowded.svg'
import Crowded from '../../../../assets/images/fixedTagStatusCrowded.svg'
import { useUserValue } from '../../../../utils/contexts/UserContext'
import { useTagValue } from '../../../../utils/contexts/TagContext'
import { fixedTagStatus } from '../../../../constants/fixedTagContext'
import { useUpdateFixedTagStatus } from '../../../../utils/Mutation/updateFixedTagSubLocationStatus'
import CustomDrawer from '../../../../components/CustomDrawer'

function ChangeStatus(props) {
  const { fixedTagSubLocation, stateDrawer, setStateDrawer } = props
  const handleDrawerClose = () => {
    setStateDrawer(false)
  }
  const { fetchFixedTagDetail } = useTagValue()
  const { token } = useUserValue()
  const [checked, setChecked] = React.useState(true)
  const [loading, setLoading] = useState(false)
  const [tmpStatus, setTmpStatus] = React.useState(
    fixedTagSubLocation.status.statusName
  )
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
    return <> </>
  }
  const { updateFixedTagSubLoacationStatus } = useUpdateFixedTagStatus()
  const handleChange = (event) => {
    setChecked(event.target.checked)
  }
  const testindex = useMemo(
    () =>
      fixedTagStatus.find(
        (fixedtagfloor) =>
          fixedtagfloor.statusName === fixedTagSubLocation.status.statusName
      ) || {},
    [fixedTagSubLocation]
  )
  const [nowIndex, setNowIndex] = useState(testindex.id)
  const findColor = (index) => {
    if (index > nowIndex) {
      return '#C4C4C4'
    }
    return fixedTagStatus[nowIndex].color
  }
  useEffect(() => {
    if (fixedTagSubLocation) {
      setTmpStatus(fixedTagSubLocation.status.statusName)
      setNowIndex(findStatusIndex(fixedTagSubLocation.status.statusName).id)
    }
  }, [fixedTagSubLocation, setTmpStatus, setNowIndex])
  const handleDrawerComplete = async () => {
    setLoading(true)
    if (token) {
      try {
        await updateFixedTagSubLoacationStatus({
          context: {
            headers: {
              authorization: token ? `Bearer ${token}` : ''
            }
          },
          variables: {
            fixedTagSubLocationId: fixedTagSubLocation.id,
            statusName: tmpStatus,
            description: '',
            imageUploadNumber: 0
          }
        })
        await fetchFixedTagDetail()
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
        <FormGroup>
          <div align='left' style={{}}>
            <FormControlLabel
              checked={checked}
              onChange={handleChange}
              control={<Switch defaultChecked color='primary' />}
              labelPlacement='start'
              label={
                <span
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: '20px',
                    fontWeight: '700'
                  }}
                >
                  營業
                </span>
              }
            />
          </div>
        </FormGroup>
        <Box
          display='flex'
          flexDirection='column'
          style={{
            height: '80%'
          }}
        >
          {checked ? (
            <>
              <List
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <img
                  src={UnCrowded}
                  alt=''
                  style={{
                    marginLeft: '5px'
                  }}
                />
                {fixedTagStatus.map((item, index) => (
                  <Fragment key={item.statusName}>
                    <ListItem
                      button
                      onClick={() => {
                        setTmpStatus(item.statusName)
                        setNowIndex(index)
                      }}
                      style={{
                        width: '35px',
                        height: '10px',
                        margin: '5px 11px',
                        alignItems: 'center',
                        backgroundColor: findColor(index)
                      }}
                    >
                      {' '}
                    </ListItem>
                  </Fragment>
                ))}
                <img src={Crowded} alt='' style={{ marginLeft: '5px' }} />
              </List>
              <div
                style={{
                  fontFamily: 'Roboto',
                  fontStyle: 'normal',
                  fontWeight: '700',
                  fontSize: '22px',
                  textAlign: 'center',
                  lineHeight: '26px',
                  margin: '10px',
                  color: fixedTagStatus[nowIndex].color
                }}
              >
                {tmpStatus}
              </div>
            </>
          ) : (
            ''
          )}
        </Box>
        <div
          style={{
            borderTop: 'solid 0.5px lightgray',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: '10px'
          }}
        >
          <Button
            id='changeStatusButton'
            size='small'
            style={{
              background: '#FDCC4F',
              fontSize: '18px',
              borderRadius: '20px',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.12)',
              fontFamily: 'Roboto',
              fontWeight: '400',
              textAlign: 'center',
              lineHeight: '21px',
              marginTop: '5px'
            }}
            variant='contained'
          >
            上傳圖片
          </Button>
        </div>
        <DialogActions>
          <Button color='primary' onClick={() => handleDrawerComplete()}>
            確定
          </Button>
        </DialogActions>
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
      </CustomDrawer>
    </>
  )
}

ChangeStatus.propTypes = {
  fixedTagSubLocation: PropTypes.object.isRequired,
  stateDrawer: PropTypes.bool.isRequired,
  setStateDrawer: PropTypes.func.isRequired
}

export default ChangeStatus
