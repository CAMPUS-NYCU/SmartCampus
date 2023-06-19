import React, { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Button } from '@mui/material'
// import { makeStyles } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'
import Grid from '@mui/material/Grid'
import moment from 'moment'
import noImage from '../../../../assets/images/no-image.svg'
import informationImage from '../../../../assets/images/fixedTagInformation.svg'
import changeImage from '../../../../assets/images/fixedTagChange.svg'
import CustomButton from '../../../../components/CustomButton'
import { useTagValue } from '../../../../utils/contexts/TagContext'
import {
  fixedTagContext,
  fixedTagStatus
} from '../../../../constants/fixedTagContext'

const useStyles = makeStyles(() => ({
  clickableFont: {
    fontSize: '0.8em',
    color: 'gray',
    cursor: 'pointer',
    textDecoration: 'underline'
  }
}))

const DetailPart = (props) => {
  const {
    activeFixedTag,
    setFixedTagSubLocations,
    setStateDrawer,
    setOpenHistory,
    setChecked,
    userDialogControl
  } = props
  const [floor, setFloor] = useState(
    activeFixedTag.locationName === '圖書館' ? '2F' : '1F'
  )

  const { fixedtagDetail } = useTagValue()
  const { information } = useMemo(
    () =>
      fixedTagContext.find(
        (fixedtagfloor) =>
          fixedtagfloor.locationName === activeFixedTag.locationName
      ) || {},
    [activeFixedTag]
  )
  const classes = useStyles()
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
  return (
    <>
      <div
        style={{
          width: '100%',
          margin: '4vw 0 0 0',
          height: '100%',
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
      <Box
        display='flex'
        alignItems='center'
        flexDirection='row'
        m={2}
        style={{
          overflowY: 'hidden',
          overflowX: 'scroll',
          height: '15%',
          width: '90%',
          margin: '2px'
        }}
      >
        {information.map((discovery) => (
          <CustomButton
            key={discovery.floor}
            buttonType={
              discovery.floor === floor
                ? 'fixedTagChosefloorButton'
                : 'fixedTagfloorButton'
            }
            onClick={() => setFloor(discovery.floor)}
          >
            {discovery.floor}
          </CustomButton>
        ))}
      </Box>
      <Box
        display='flex'
        flexDirection='column'
        m={2}
        style={{
          overflowX: 'hidden',
          overflowY: 'scroll',
          height: '80%',
          width: '90%',
          marginTop: '10px'
        }}
      >
        {fixedtagDetail.fixedTagSubLocations.length > 0
          ? fixedtagDetail.fixedTagSubLocations.map((fixedtagfloor) => {
              if (fixedtagfloor.floor === floor) {
                return (
                  <Grid
                    key={fixedtagfloor.id + fixedtagfloor.floor}
                    container
                    spacing={2}
                    style={{
                      backgroundColor: '#EEEEEE',
                      borderRadius: '10px',
                      margin: '5px',
                      width: '98%'
                    }}
                    justifyContent='center'
                    alignItems='center'
                  >
                    <Grid
                      item
                      xs={6}
                      style={{
                        fontFamily: 'Roboto',
                        fontStyle: 'normal',
                        fontWeight: '700',
                        fontSize: '14px',
                        lineHeight: '12px',
                        letterSpacing: '0.75px',
                        textTransform: 'uppercase'
                      }}
                    >
                      {fixedtagfloor.type !== 'floor'
                        ? fixedtagfloor.name
                        : `${fixedtagfloor.floor} 公共區域`}
                    </Grid>
                    <Grid
                      item
                      xs={5}
                      style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        paddingRight: '0px'
                      }}
                    >
                      <Button
                        key={fixedtagfloor.id}
                        id='changeStatusButton'
                        style={{
                          background: findStatusIndex(
                            fixedtagfloor.status.statusName
                          ).color,
                          fontSize: '12px',
                          borderRadius: '5px'
                        }}
                      >
                        <img
                          src={
                            findStatusIndex(fixedtagfloor.status.statusName).img
                          }
                          alt=''
                        />
                        &nbsp;{fixedtagfloor.status.statusName}
                      </Button>
                    </Grid>
                    <Grid
                      item
                      xs={4}
                      style={{
                        fontSize: '12px',
                        fontColor: '#888888',
                        fontFamily: 'Roboto',
                        fontStyle: 'normal',
                        fontWeight: '400',
                        lineHeight: '18px',
                        letterSpacing: '0.75px'
                      }}
                    >
                      <Box m={0.5} style={{ fontSize: '12px', color: 'gray' }}>
                        <Box
                          display='inline'
                          className={classes.clickableFont}
                          style={{ fontSize: '1em' }}
                          onClick={() => {
                            setFixedTagSubLocations(fixedtagfloor)
                            userDialogControl.setOpen(true)
                          }}
                          mr={1}
                        >
                          {
                            fixedtagfloor?.statusHistory?.statusList?.[0]
                              ?.createUser?.displayName
                          }
                          <br />
                        </Box>
                        編輯於{' '}
                        {moment(
                          fixedtagfloor?.statusHistory?.statusList?.[0]
                            ?.createTime
                        ).fromNow()}
                      </Box>
                    </Grid>
                    <Grid
                      item
                      xs={4}
                      style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        paddingRight: '0px'
                      }}
                    >
                      <Button
                        id='changeStatusButton'
                        size='small'
                        style={{
                          background: '#FDCC4F',
                          fontSize: '12px',
                          borderRadius: '20px',
                          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.12)'
                        }}
                        variant='contained'
                        onClick={() => {
                          setFixedTagSubLocations(fixedtagfloor)
                          setOpenHistory(true)
                        }}
                      >
                        <img src={informationImage} alt='' />
                        &nbsp;詳細資訊
                      </Button>
                    </Grid>
                    <Grid
                      item
                      xs={4}
                      style={{
                        display: 'flex',
                        justifyContent: 'center'
                      }}
                    >
                      <Button
                        id='changeStatusButton'
                        size='small'
                        style={{
                          background: '#FDCC4F',
                          fontSize: '12px',
                          borderRadius: '20px',
                          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.12)'
                        }}
                        variant='contained'
                        onClick={() => {
                          setFixedTagSubLocations(fixedtagfloor)
                          setStateDrawer(true)
                          if (fixedtagfloor.status.statusName === '暫停服務') {
                            setChecked(false)
                          } else {
                            setChecked(true)
                          }
                        }}
                      >
                        <img src={changeImage} alt='' />
                        &nbsp;更改狀態
                      </Button>
                    </Grid>
                  </Grid>
                )
              }
              return (
                <div key={fixedtagfloor.id}>
                  <></>
                </div>
              )
            })
          : ''}
      </Box>
    </>
  )
}
DetailPart.propTypes = {
  activeFixedTag: PropTypes.object.isRequired,
  setFixedTagSubLocations: PropTypes.func.isRequired,
  setStateDrawer: PropTypes.func.isRequired,
  setOpenHistory: PropTypes.func.isRequired,
  setChecked: PropTypes.func.isRequired,
  userDialogControl: PropTypes.object.isRequired
}

export default DetailPart
