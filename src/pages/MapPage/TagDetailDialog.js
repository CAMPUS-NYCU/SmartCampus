import React, { useState } from 'react'
import PropTypes from 'prop-types'
import DialogTitle from '@material-ui/core/DialogTitle'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/Close'
import Drawer from '@material-ui/core/Drawer'
import { Box } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import HandicapIcon from '../../assets/images/handicap-icon.svg'
import useTagDetail from './hooks/useTagDetail'
import { Lightbox } from "react-modal-image";

TagDetailDialog.propTypes = {
  activeTag: PropTypes.object,
  onClose: PropTypes.func.isRequired
}
TagDetailDialog.defaultProps = {
  activeTag: null
}

const useStyles = makeStyles((theme) => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },
  clickableFont: {
    fontSize: '0.8em',
    color: 'gray'
  },
  largeImage:{
    maxWidth:'100vw'
  }
}))

function TagDetailDialog(props) {
  const { activeTag, onClose } = props
  const detail = useTagDetail(activeTag.id)
  const [ largeImg, setLargeImg ] = useState(null)
  const classes = useStyles()
  return (
    <>
      <Drawer
        anchor='bottom'
        variant='persistent'
        open={activeTag}
        onClose={onClose}
      >
        <div style={{ height: '85vh', display: 'flex', flexDirection: 'column' }}>
          <DialogTitle disableTypography onClose={onClose}>
            <Typography variant='h5'>
              {activeTag ? activeTag.discoveryName : '詳細資訊'}
            </Typography>
            <IconButton
              aria-label='close'
              className={classes.closeButton}
              onClick={onClose}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          {activeTag && detail ? (
            <Box
              display='flex'
              flexDirection='column'
              alignItems='center'
              flexGrow={1}
            >
              <Box
                display='flex'
                alignItems='center'
                flexDirection='row'
                justifyContent='space-between'
                width='100%'
              >
                <Box
                  display='flex'
                  alignItems='center'
                  justifyContent='space-around'
                  width='50%'
                >
                  <img src={HandicapIcon} alt='' />
                  <Typography>{activeTag.missionName}</Typography>
                  <Typography>圖書館</Typography>
                </Box>
                <Button
                  variant='contained'
                  style={{ background: '#dce775', cursor: 'default' }}
                  disableElevation
                  disableRipple
                >
                  待解決
              </Button>
              </Box>
              <div style={{
                width: '100vw',
                margin: '4vw 0 0 0',
                height: '100%',
                flexGrow: '1',
                overflowX: 'scroll',
                overflowY: 'hidden',
                display: 'flex',
                flexDirection: 'row'
              }}>
                <div
                  onClick={()=>setLargeImg('https://pgw.udn.com.tw/gw/photo.php?u=https://uc.udn.com.tw/photo/2019/09/18/1/6835002.jpg&x=0&y=0&sw=0&sh=0&exp=3600')}
                  style={{
                    width: '80vw',
                    height: '100%',
                    flexShrink: '0',
                    overflow: 'hidden',
                    display: 'flex',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundImage:
                      'url(https://pgw.udn.com.tw/gw/photo.php?u=https://uc.udn.com.tw/photo/2019/09/18/1/6835002.jpg&x=0&y=0&sw=0&sh=0&exp=3600)'
                  }} />

                <div
                  onClick={()=>setLargeImg('https://pgw.udn.com.tw/gw/photo.php?u=https://uc.udn.com.tw/photo/2019/09/18/1/6835002.jpg&x=0&y=0&sw=0&sh=0&exp=3600')}
                  style={{
                    width: '80vw',
                    height: '100%',
                    flexShrink: '0',
                    overflowY: 'hidden',
                    display: 'flex',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundImage:
                      'url(https://pgw.udn.com.tw/gw/photo.php?u=https://uc.udn.com.tw/photo/2019/09/18/1/6835002.jpg&x=0&y=0&sw=0&sh=0&exp=3600)'
                  }}
                />
              </div>
              <Box
                display='flex'
                alignItems='center'
                flexDirection='row'
                justifyContent='space-between'
                m={2}
                width='80vw'
              >
                <Button variant='contained'>更改狀態</Button>
                <Box display='flex' flexDirection='column' alignItems='flex-end'>
                  <Box
                    className={classes.clickableFont}
                    style={{ textDecoration: 'underline', cursor: 'pointer' }}
                    m={0.5}
                  >
                    狀態編輯紀錄
                </Box>
                  <Box className={classes.clickableFont} m={0.5}>
                    {detail.newLastUpdateTime}
                  </Box>
                </Box>
              </Box>
              <div
                style={{
                  width: '80vw',
                  borderTop: 'solid 0.5px lightgray',
                  borderBottom: 'solid 0.5px lightgray',
                  paddingBottom: '2'
                }}
              >
                {detail.description ? (
                  <Box
                    my={2}
                    textOverflow='ellipsis'
                    component='div'
                    overflow='hidden'
                    height='4.5em'
                  >
                    {detail.description}
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
              <Box
                display='flex'
                justifyContent='flex-end'
                alignItems='center'
                width='80%'
                m={2}
              >
                <Box className={classes.clickableFont} m={0.5}>
                  86人贊同此問題待處理
              </Box>
                <Button variant='contained' style={{ marginLeft: '8px' }}>
                  贊同
              </Button>
              </Box>
            </Box>
          ) : (
              <Typography>讀取中...</Typography>
            )}
        </div>
      </Drawer>
      {largeImg&&(<Lightbox large={largeImg} onClose={()=>setLargeImg(null)} hideDownload hideZoom></Lightbox>)}
      {/* <Dialog classes={classes.largeImage} open={largeImg} onClose={()=>setLargeImg(null)}>
        <div style={{backgroundImage:`url(${largeImg})`, width:'100vw', height:'60vh'}}></div>
      </Dialog> */}
    </>
  )
}

export default TagDetailDialog
