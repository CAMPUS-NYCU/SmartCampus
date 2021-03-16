import React, { useState, useEffect } from 'react'
import { Box, Button, CircularProgress, IconButton } from '@material-ui/core'
import { useSnackbar } from 'notistack'
import noImage from '../../../../assets/images/no-image.svg'
import EditIcon from '../../../../assets/images/edit.svg'
import EditHistory from './editHistory'
import { useUpdateVote } from '../../Mutation/useVoteTag'

const DetailPart = props => {
  const {
    detail,
    activeTag,
    classes,
    missionName,
    setLargeImg,
    setStateDrawer,
    tagMissionIndex,
    deny,
    guest,
    threshold
  } = props
  const [openHistory, setOpenHistory] = useState(false)
  const handleHistoryClose = () => {
    setOpenHistory(false)
  }
  const { upVote } = useUpdateVote()
  const [numberOfVote, setNumberOfVote] = useState(0)
  const [hasUpVote, setHasUpVote] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  useEffect(() => {
    setNumberOfVote(detail ? detail.status.numberOfUpVote : 0)
    setHasUpVote(detail ? detail.status.hasUpVote : false)
    activeTag.category.missionName === '問題任務' &&
      detail &&
      enqueueSnackbar(
        `再${
          detail ? threshold - detail.status.numberOfUpVote : threshold
        }人投票即可刪除回報`,
        {
          variant: 'warning'
        }
      )
  }, [detail, enqueueSnackbar, activeTag, threshold])
  const handleUopVote = () => {
    if (guest) {
      deny()
      return
    }
    setNumberOfVote(prevNumberOfVote =>
      hasUpVote ? prevNumberOfVote - 1 : prevNumberOfVote + 1
    )
    upVote(detail.id, !hasUpVote)
    setHasUpVote(prevHasUpVote => !prevHasUpVote)
  }

  return (
    <>
      {detail ? (
        <>
          <div
            style={{
              width: '100%',
              margin: '4vw 0 0 0',
              height: '100%',
              webkitFlexGrow: '1',
              overflowX: 'scroll',
              overflowY: 'hidden',
              display: '-webkit-flex',
              flexDirection: 'row'
            }}
          >
            {detail.imageUrl.length === 0 ? (
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
              detail.imageUrl.map(url => {
                return (
                  <Button
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
            {detail.imageUrl.length === 1 && (
              <div
                style={{
                  width: '80%',
                  flexShrink: '0',
                  overflow: 'hidden',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundImage: `url(${noImage})`
                }}
              />
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
                guest ? deny() : setStateDrawer(true)
              }}
              style={{
                background: '#FDCC4F',
                /* Primary_light */
                border: '1px solid #FFEDC0',
                borderRadius: '20px',
                boxShadow:
                  'inset 0px 2px 4px rgba(0, 0, 0, 0.14), 0px 4px 4px rgba(0, 0, 0, 0.25)'
              }}
              variant='contained'
            >
              更改狀態
            </Button>
            <Box display='flex' flexDirection='column' alignItems='flex-end'>
              <Box
                className={classes.clickableFont}
                style={{
                  textDecoration: 'underline',
                  cursor: 'pointer'
                }}
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
              <Box className={classes.clickableFont} m={0.5}>
                {detail.createUser.displayName} 編輯於{' '}
                {detail.newLastUpdateTime}
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
            {activeTag.status.description ? (
              <Box
                my={2}
                textOverflow='ellipsis'
                component='div'
                overflow='hidden'
                height='4.5em'
              >
                {activeTag.status.description}
              </Box>
            ) : (
              <p>無描述</p>
            )}
            <Box display='flex' justifyContent='flex-end'>
              <Box className={classes.clickableFont} m={0.5}>
                {detail.newCreateTime}
              </Box>
            </Box>
          </div>
          {activeTag.category.missionName === missionName[1] && (
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
                {numberOfVote ? numberOfVote : 0}
                人贊同此問題待處理
                <br />再{numberOfVote ? threshold - numberOfVote : threshold}人即可刪除此回報
              </Box>
              <IconButton
                variant='contained'
                style={{
                  marginLeft: '8px',
                  background: hasUpVote ? '#FDCC4F' : '#EEEEEE',
                  border: '1px solid #BABABA',
                  fontSize: '15px'
                }}
                onClick={handleUopVote}
              >
                +1
              </IconButton>
            </Box>
          )}
        </>
      ) : (
        <Box
          height='100%'
          display='flex'
          alignItems='center'
          style={{ webkitFlexGrow: '1', display: '-webkit-flex' }}
        >
          <CircularProgress />
        </Box>
      )}
      <EditHistory
        open={openHistory}
        handleHistoryClose={handleHistoryClose}
        tagMissionIndex={tagMissionIndex}
        activeTag={activeTag}
      />
    </>
  )
}

export default DetailPart
