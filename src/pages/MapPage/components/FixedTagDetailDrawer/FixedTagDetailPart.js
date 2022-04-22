import React, { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Button, makeStyles } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import moment from 'moment'
import noImage from '../../../../assets/images/no-image.svg'
import informationImage from '../../../../assets/images/fixedTagInformation.svg'
import changeImage from '../../../../assets/images/fixedTagChange.svg'
import veryUnCrowded from '../../../../assets/images/veryUnCrowded.svg'
import unCrowded from '../../../../assets/images/unCrowded.svg'
import normalCrowded from '../../../../assets/images/normalCrowded.svg'
import Crowded from '../../../../assets/images/Crowded.svg'
import veryCrowded from '../../../../assets/images/veryCrowded.svg'
import CustomButton from '../../../../components/CustomButton'
import useModal from '../../../../utils/hooks/useModal'
import { fixedTagContext } from '../../../../constants/fixedTagContext'

const useStyles = makeStyles(() => ({
  clickableFont: {
    fontSize: '0.8em',
    color: 'gray',
    cursor: 'pointer',
    textDecoration: 'underline'
  }
}))

const DetailPart = (props) => {
  const { activeFixedTag, setFixedTagSubLocations, setStateDrawer } = props
  const [floor, setFloor] = useState('1F')
  const { information } = useMemo(
    () =>
      fixedTagContext.find(
        (fixedtagfloor) =>
          fixedtagfloor.locationName === activeFixedTag.locationName
      ) || {},
    [activeFixedTag]
  )
  const classes = useStyles()
  const userDialogControl = useModal()
  const findStatusColor = (statusName) => {
    if (statusName === '非常不壅擠') {
      return '#D3E430'
    }
    if (statusName === '不壅擠') {
      return '#FAE391'
    }
    if (statusName === '普通') {
      return '#FFCC80'
    }
    if (statusName === '壅擠') {
      return '#FFAB6E'
    }
    if (statusName === '非常壅擠') {
      return '#FF8965'
    }
    return <></>
  }
  const findStatusIcon = (statusName) => {
    if (statusName === '非常不壅擠') {
      return veryUnCrowded
    }
    if (statusName === '不壅擠') {
      return unCrowded
    }
    if (statusName === '普通') {
      return normalCrowded
    }
    if (statusName === '壅擠') {
      return Crowded
    }
    if (statusName === '非常壅擠') {
      return veryCrowded
    }
    return <></>
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
        style={{
          overflowY: 'hidden',
          overflowX: 'scroll',
          height: '13%',
          width: '90%'
        }}
        m={2}
      >
        {information.map((discovery) => (
          <Grid item xs={4}>
            <CustomButton
              buttonType={
                discovery.floor === floor
                  ? 'fixedTagChosefloorButton'
                  : 'fixedTagfloorButton'
              }
              onClick={() => setFloor(discovery.floor)}
            >
              {discovery.floor}
            </CustomButton>
          </Grid>
        ))}
      </Box>
      <Box
        display='flex'
        flexDirection='column'
        style={{
          overflowX: 'hidden',
          overflowY: 'scroll',
          height: '80%',
          width: '90%'
        }}
        m={2}
      >
        {activeFixedTag.fixedTagSubLocations.map((fixedtagfloor) => {
          if (fixedtagfloor.floor === floor) {
            return (
              <Grid
                container
                spacing={2}
                style={{
                  backgroundColor: '#EEEEEE',
                  borderRadius: '10px',
                  margin: '5px',
                  width: '98%'
                }}
                justify='center'
                alignItems='center'
              >
                <Grid
                  key={fixedtagfloor.id}
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
                    : `${fixedtagfloor.floor} 座位區`}
                </Grid>

                <Grid item xs={5}>
                  <Button
                    id='changeStatusButton'
                    variant='contained'
                    style={{
                      background: findStatusColor(
                        fixedtagfloor.status.statusName
                      ),
                      fontSize: '12px',
                      borderRadius: '5px',
                      width: '115px',
                      height: '24px',
                      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.12)'
                    }}
                  >
                    <img
                      src={findStatusIcon(fixedtagfloor.status.statusName)}
                      alt=''
                    />
                    &nbsp;{fixedtagfloor.status.statusName}
                  </Button>
                </Grid>
                <Grid
                  item
                  xs={5}
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
                      onClick={() => userDialogControl.setOpen(true)}
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
                      fixedtagfloor?.statusHistory?.statusList?.[0]?.createTime
                    ).fromNow()}
                  </Box>
                </Grid>
                <Grid item style={{ justifyContent: 'flex-end', xs: '4' }}>
                  <Button
                    id='changeStatusButton'
                    size='small'
                    style={{
                      background: '#FDCC4F',
                      fontSize: '12px',
                      /* Primary_light */
                      borderRadius: '20px',
                      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.12)'
                    }}
                    variant='contained'
                  >
                    <img src={informationImage} alt='' />
                    &nbsp;詳細資訊
                  </Button>
                </Grid>
                <Grid item style={{ justifyContent: 'flex-end', xs: '4' }}>
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
        })}
      </Box>
    </>
  )
}
DetailPart.propTypes = {
  activeFixedTag: PropTypes.object.isRequired,
  setFixedTagSubLocations: PropTypes.func.isRequired,
  setStateDrawer: PropTypes.func.isRequired
}

export default DetailPart
