import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Box, Button, CircularProgress, Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import moment from 'moment'
import noImage from '../../../../assets/images/no-image.svg'
import EditHistory from './editHistory'
import { useUserValue } from '../../../../utils/contexts/UserContext'
import UserDialog from '../UserDialog/UserDialog'
import useModal from '../../../../utils/hooks/useModal'
import ResearchTextWrapper from '../../../../components/ResarchTextWrapper'
import res1StatusType from '../../../../constants/res1StatusType'
import LocationIcon from '../../../../assets/images/res1-detailLocation.svg'
import CategoryDescNameIcon from '../../../../assets/images/res1-detailCategoryDescName.svg'

const useStyles = makeStyles(() => ({
  clickableFont: {
    fontSize: '0.8em',
    color: 'gray',
    cursor: 'pointer',
    textDecoration: 'underline'
  }
}))

const DetailPart = (props) => {
  const { tagDetail, setLargeImg, setStateDrawer } = props
  const classes = useStyles()
  const { isGuest, signOut } = useUserValue()
  const [openHistory, setOpenHistory] = useState(false)
  const handleHistoryClose = () => {
    setOpenHistory(false)
  }
  const userDialogControl = useModal()

  const [thisStatusType, setThisStatusType] = useState({})
  useEffect(() => {
    for (let i = 0; i < res1StatusType.length; i += 1) {
      if (tagDetail.status.statusName === res1StatusType[i].status) {
        setThisStatusType(res1StatusType[i])
      }
    }
  }, [tagDetail])

  return (
    <>
      {tagDetail.id ? (
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
            {tagDetail.imageUrl.length === 0 ? (
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
            ) : (
              tagDetail.imageUrl.map((url) => {
                if (tagDetail.imageUrl.length === 1) {
                  return (
                    <Button
                      key={url}
                      onClick={() => setLargeImg(`${url}`)}
                      style={{
                        width: '100%',
                        flexShrink: '0',
                        overflowY: 'hidden',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundImage: `url(${url})`
                      }}
                    />
                  )
                }
                return (
                  <Button
                    key={url}
                    onClick={() => setLargeImg(`${url}`)}
                    style={{
                      width: '80%',
                      flexShrink: '0',
                      overflowY: 'hidden',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundImage: `url(${url})`
                    }}
                  />
                )
              })
            )}
          </div>
          <div
            style={{
              width: '90%',
              borderTop: 'solid 0.5px lightgray',
              paddingBottom: '2'
            }}
          >
            {/* 地點、樓層 */}
            <Grid container marginTop={0.5}>
              <Grid container item xs={1}>
                <img src={LocationIcon} alt='地點與樓層' />
              </Grid>
              <Grid item xs={4} mr={1}>
                <ResearchTextWrapper>
                  {tagDetail.locationName}
                </ResearchTextWrapper>
              </Grid>
              <Grid item xs={1.5}>
                <ResearchTextWrapper>
                  {`${tagDetail.floor}樓`}
                </ResearchTextWrapper>
              </Grid>
            </Grid>

            {/* 回報項目 */}
            <Grid container marginTop={0.5}>
              <Grid item xs={1}>
                <img src={CategoryDescNameIcon} alt='項目描述' />
              </Grid>
              <Grid item xs={4} marginRight={1}>
                <ResearchTextWrapper>
                  {tagDetail.category?.categoryDescName}
                </ResearchTextWrapper>
              </Grid>
            </Grid>

            {/* 狀態 */}
            <Grid container marginTop={0.5}>
              <Grid item xs={1}>
                <img src={thisStatusType.statusIcon} alt='項目狀態與狀態描述' />
              </Grid>
              <Grid item xs={4}>
                <ResearchTextWrapper bgcolor={thisStatusType.statusColor}>
                  {`${tagDetail.status.statusName}：${tagDetail.status.statusDescName}`}
                </ResearchTextWrapper>
              </Grid>
            </Grid>

            {/* 上次編輯者、時間 */}
            <Box display='flex' flexDirection='column' alignItems='flex-end'>
              <Box m={0.5} style={{ fontSize: '0.8em', color: 'gray' }}>
                <Box
                  display='inline'
                  className={classes.clickableFont}
                  style={{ fontSize: '1em' }}
                  onClick={() => userDialogControl.setOpen(true)}
                  mr={1}
                >
                  {
                    // 待更新功能串好後測試
                    tagDetail?.statusHistory?.statusList?.[0]?.createUser
                      ?.displayName
                    // tagDetail?.createUser?.displayName
                  }
                </Box>
                編輯於{' '}
                {moment(
                  tagDetail?.statusHistory?.statusList?.[0]?.createTime
                ).format('YYYY-MM-DD h:mm')}
              </Box>
            </Box>
          </div>
          <Box
            display='flex'
            alignItems='center'
            flexDirection='row'
            justifyContent='center'
            m={2}
            width='90%'
          >
            <Button
              id='changeStatusButton'
              onClick={() => {
                if (isGuest) {
                  signOut()
                } else {
                  setStateDrawer(true)
                }
              }}
              style={{
                background: '#FDCC4F',
                /* Primary_light */
                borderRadius: '20px',
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.12)'
              }}
              variant='contained'
            >
              更新回報
            </Button>
          </Box>

          <UserDialog
            userId={tagDetail?.statusHistory?.statusList?.[0]?.createUser?.uid}
            control={userDialogControl}
          />
        </>
      ) : (
        <Box
          height='100%'
          display='flex'
          alignItems='center'
          style={{ flexGrow: '1', display: '-webkit-flex' }}
        >
          <CircularProgress />
        </Box>
      )}
      {tagDetail.id && (
        <EditHistory
          open={openHistory}
          handleHistoryClose={handleHistoryClose}
          tagMissionIndex={undefined}
          tagDetail={tagDetail}
        />
      )}
    </>
  )
}

DetailPart.propTypes = {
  tagDetail: PropTypes.object.isRequired,
  setLargeImg: PropTypes.func.isRequired,
  setStateDrawer: PropTypes.func.isRequired
  // threshold: PropTypes.numsber.isRequired
}

export default DetailPart
