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
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import DialogActions from '@material-ui/core/DialogActions'
import { Lightbox } from 'react-modal-image'
import HandicapIcon from '../../assets/images/handicap-icon.svg'
import EditIcon from '../../assets/images/edit.svg'
import WaitIcon from '../../assets/images/wait.svg'
import SolvedIcon from '../../assets/images/solved.svg'
import useTagDetail from './hooks/useTagDetail'

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
  changeButton: {
    borderRadius: '40%'
  }
}))

function TagDetailDialog(props) {
  const { activeTag, onClose } = props
  const detail = useTagDetail(activeTag.id)
  const [largeImg, setLargeImg] = useState(null)
  const [stateDrawer, setStateDrawer] = useState(false)
  const [tagState, setTagState] = useState(1)
  const [temporaryTagState, setTemporaryTagState] = useState(tagState)
  const resetTemporaryTagState = () => {
    setTemporaryTagState(tagState)
  }
  const classes = useStyles()
  const handleDrawerClose=()=>{
    setStateDrawer(false)
    resetTemporaryTagState()
  }
  const handleDrawerComplete = () => {
    setStateDrawer(false)
    setTagState(temporaryTagState)
  }
  const tagStateString = ['待處理', '已解決']
  const bookmarksColor = ['#FFB59F','#dce775']
  const changeDrawer = [
    ['#FF8965', 'black'],
    ['black', '#D3E430']
  ]
  return (
    <>
      <Drawer
        anchor='bottom'
        variant='persistent'
        open={activeTag}
        onClose={onClose}
      >
        <div
          style={{ height: '85vh', display: 'flex', flexDirection: 'column' }}
        >
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

                <div
                  style={{
                    cursor: 'default',
                    width: '100px',
                    height: '36px',
                    borderTop: `18px solid ${bookmarksColor[tagState]}`,
                    borderBottom: `18px solid ${bookmarksColor[tagState]}`,
                    borderLeft: '12px solid transparent',
                    textAlign: 'center'
                  }}
                >
                  <Typography style={{ position: 'relative', top: '-10px' }}>
                    {tagStateString[tagState]}
                  </Typography>
                </div>
              </Box>
              <div
                style={{
                  width: '100vw',
                  margin: '4vw 0 0 0',
                  height: '100%',
                  flexGrow: '1',
                  overflowX: 'scroll',
                  overflowY: 'hidden',
                  display: 'flex',
                  flexDirection: 'row'
                }}
              >
                <div
                  onClick={() =>
                    setLargeImg(
                      'https://pgw.udn.com.tw/gw/photo.php?u=https://uc.udn.com.tw/photo/2019/09/18/1/6835002.jpg&x=0&y=0&sw=0&sh=0&exp=3600'
                    )
                  }
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
                  }}
                />
                <div
                  onClick={() =>
                    setLargeImg(
                      'https://pgw.udn.com.tw/gw/photo.php?u=https://uc.udn.com.tw/photo/2019/09/18/1/6835002.jpg&x=0&y=0&sw=0&sh=0&exp=3600'
                    )
                  }
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
                <Button
                  onClick={() => {
                    setStateDrawer(true)
                  }}
                  style={{
                    background: '#FDCC4F',
                    /* Primary_light */
                    border: '1px solid #FFEDC0',
                    borderRadius: '20px',
                    boxShadow: 'inset 0px 2px 4px rgba(0, 0, 0, 0.14)',
                    filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))'
                  }}
                  variant='contained'
                >
                  更改狀態
                </Button>
                <Box
                  display='flex'
                  flexDirection='column'
                  alignItems='flex-end'
                >
                  <Box
                    className={classes.clickableFont}
                    style={{ textDecoration: 'underline', cursor: 'pointer' }}
                    m={0.5}
                    width='85px'
                    display='flex'
                    alignItems='center'
                    justifyContent='space-between'
                  >
                    <img src={EditIcon} alt='' />
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
      <Drawer
        anchor='bottom'
        open={stateDrawer}
        onclose={() => setStateDrawer(false)}
      >
        <DialogTitle disableTypography onClose={onClose}>
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
            <ListItem button onClick={() => setTemporaryTagState(0)}>
              <ListItemIcon>
                <img src={WaitIcon} alt='' />
              </ListItemIcon>
              <ListItemText
                primary='待處理'
                style={{ color: `${changeDrawer[0][temporaryTagState]}` }}
              />
            </ListItem>
            <Divider />
            <ListItem button onClick={() => setTemporaryTagState(1)}>
              <ListItemIcon>
                <img src={SolvedIcon} alt='' />
              </ListItemIcon>
              <ListItemText
                primary='已解決'
                style={{ color: `${changeDrawer[1][temporaryTagState]}` }}
              />
            </ListItem>
          </List>
          <DialogActions>
            <Button
              style={{ color: '#FDCC4F' }}
              onClick={() => handleDrawerComplete()}
            >
              確定
            </Button>
          </DialogActions>
        </Box>
      </Drawer>
      {largeImg && (
        <Lightbox
          large={largeImg}
          onClose={() => setLargeImg(null)}
          hideDownload
          hideZoom
        />
      )}
    </>
  )
}

export default TagDetailDialog
