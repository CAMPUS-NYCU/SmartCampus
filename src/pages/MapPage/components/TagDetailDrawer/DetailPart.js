import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  makeStyles
} from '@material-ui/core'
import { useSnackbar } from 'notistack'
import noImage from '../../../../assets/images/no-image.svg'
import EditIcon from '../../../../assets/images/edit.svg'
import EditHistory from './editHistory'
import { useUpdateVote } from '../../../../utils/Mutation/useVoteTag'
import { useUserValue } from '../../../../utils/contexts/UserContext'
import UserDialog from '../UserDialog/UserDialog'
import useModal from '../../../../utils/hooks/useModal'

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
    tagDetail,
    activeTag,
    missionName,
    setLargeImg,
    setStateDrawer,
    tagMissionIndex,
    threshold
  } = props
  const classes = useStyles()
  const { isGuest, signOut } = useUserValue()
  const [openHistory, setOpenHistory] = useState(false)
  const handleHistoryClose = () => {
    setOpenHistory(false)
  }
  const { upVote } = useUpdateVote()
  const [numberOfVote, setNumberOfVote] = useState(0)
  const [hasUpVote, setHasUpVote] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const userDialogControl = useModal()
  useEffect(() => {
    setNumberOfVote(tagDetail ? tagDetail.status.numberOfUpVote : 0)
    setHasUpVote(tagDetail ? tagDetail.status.hasUpVote : false)
    if (tagDetail.status.statusName === '已解決' && tagDetail) {
      enqueueSnackbar(
        `再${
          tagDetail ? threshold - tagDetail.status.numberOfUpVote : threshold
        }人投票即可刪除回報`,
        {
          variant: 'warning'
        }
      )
    }
  }, [tagDetail, enqueueSnackbar, threshold])
  const handleUopVote = () => {
    if (isGuest) {
      signOut()
      return
    }
    setNumberOfVote((prevNumberOfVote) =>
      hasUpVote ? prevNumberOfVote - 1 : prevNumberOfVote + 1
    )
    upVote(tagDetail.id, !hasUpVote)
    setHasUpVote((prevHasUpVote) => !prevHasUpVote)
  }

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
              })
            )}
          </div>
          <Box
            display='flex'
            alignItems='center'
            flexDirection='row'
            justifyContent='space-between'
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
              更改狀態
            </Button>
            <Box display='flex' flexDirection='column' alignItems='flex-end'>
              <Box
                className={classes.clickableFont}
                m={0.5}
                width='85px'
                display='flex'
                alignItems='center'
                justifyContent='space-between'
                onClick={() => setOpenHistory(true)}
              >
                <img src={EditIcon} alt='' />
                狀態編輯紀錄
              </Box>
              <Box m={0.5} style={{ fontSize: '0.8em', color: 'gray' }}>
                <Box
                  display='inline'
                  className={classes.clickableFont}
                  style={{ fontSize: '1em' }}
                  onClick={() => userDialogControl.setOpen(true)}
                  mr={1}
                >
                  {tagDetail.createUser.displayName}
                </Box>
                編輯於 {tagDetail.newCreateTime}
              </Box>
            </Box>
          </Box>
          <div
            style={{
              width: '90%',
              borderTop: 'solid 0.5px lightgray',
              borderBottom:
                activeTag.category.missionName === missionName[1] &&
                'solid 0.5px lightgray',
              paddingBottom: '2'
            }}
          >
            {tagDetail.status.description ? (
              <Box
                my={2}
                textOverflow='ellipsis'
                component='div'
                overflow='hidden'
                height='4.5em'
              >
                {tagDetail.status.description}
              </Box>
            ) : (
              <p>無描述</p>
            )}
            <Box display='flex' justifyContent='flex-end'>
              <Box className={classes.clickableFont} m={0.5}>
                {tagDetail.newLastUpdateTime}
              </Box>
            </Box>
          </div>
          {tagDetail.status.statusName === '已解決' && (
            <Box
              display='flex'
              justifyContent='flex-end'
              alignItems='center'
              width='90%'
              m={2}
            >
              <div
                style={{
                  width: '40%',
                  height: '6px',
                  marginRight: '30px',
                  border: 'solid 0.5px',
                  borderColor: 'lightgray'
                }}
              >
                <div
                  style={{
                    width: `${(numberOfVote / threshold) * 100}%`,
                    height: '100%',
                    backgroundColor: '#FDCC4F'
                  }}
                />
              </div>
              <Box className={classes.clickableFont} m={0.5}>
                {numberOfVote || 0}
                人贊同此問題已解決
                <br />再{numberOfVote ? threshold - numberOfVote : threshold}
                人即可刪除此回報
              </Box>
              <IconButton
                variant='contained'
                style={{
                  marginLeft: '8px',
                  background: hasUpVote ? '#FDCC4F' : '#EEEEEE',
                  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.12)',
                  fontSize: '15px'
                }}
                onClick={handleUopVote}
              >
                +1
              </IconButton>
            </Box>
          )}
          <UserDialog
            userId={tagDetail.createUser.uid}
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
          tagMissionIndex={tagMissionIndex}
          tagDetail={tagDetail}
        />
      )}
    </>
  )
}

DetailPart.propTypes = {
  tagDetail: PropTypes.object.isRequired,
  activeTag: PropTypes.object.isRequired,
  missionName: PropTypes.array.isRequired,
  setLargeImg: PropTypes.func.isRequired,
  setStateDrawer: PropTypes.func.isRequired,
  tagMissionIndex: PropTypes.number.isRequired,
  threshold: PropTypes.number.isRequired
}

export default DetailPart
