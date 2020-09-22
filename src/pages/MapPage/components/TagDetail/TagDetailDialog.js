import React, { useState } from 'react'
import PropTypes from 'prop-types'
import DialogTitle from '@material-ui/core/DialogTitle'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/Close'
import Drawer from '@material-ui/core/Drawer'
import { Box, CircularProgress, Toolbar } from '@material-ui/core'
import { Lightbox } from 'react-modal-image'
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn'
import useTagDetail from '../../hooks/useTagDetail'
import Mission2 from '../../../../assets/images/mission2circle.svg'
import Mission1 from '../../../../assets/images/mission1circle.svg'
import Mission3 from '../../../../assets/images/mission3circle.svg'
import { missionInfo } from '../../constants/missionInfo'
import { tagStatus } from '../../constants/tagData'
import ChangeStatus from './ChangeStatus'
import DetailPart from './DetailPart'

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
  const classes = useStyles()
  const missionImage = [Mission1, Mission2, Mission3]
  const missionName = missionInfo.map((mission) => {
    return mission.missionName
  })
  const tagMissionIndex = missionName.findIndex(
    (mission) => mission === activeTag.category.missionName
  )
  const tagStatusIndex = tagStatus[tagMissionIndex].findIndex(
    (status) => status.statusName === activeTag.status.statusName
  )
  const status = tagStatus[tagMissionIndex][tagStatusIndex]
  return (
    <>
      <Drawer
        anchor='bottom'
        variant='persistent'
        open={activeTag}
        onClose={onClose}
        PaperProps={{
          style: {
            borderRadius: '20px 20px 0 0',
            backgroundColor: '#FAFAFA'
          }
        }}
      >
        <div
          style={{
            height: '85vh',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '10px'
          }}
        >
          {activeTag ? (
            <>
              <Toolbar disableTypography onClose={onClose}>
                <IconButton edge='start' aria-label='close' onClick={onClose}>
                  <KeyboardReturnIcon />
                </IconButton>
                <Typography variant='h5'>
                  {activeTag ? activeTag.category.targetName : '詳細資訊'}
                </Typography>
              </Toolbar>
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
                    width='70%'
                  >
                    <img src={missionImage[tagMissionIndex]} alt='' />
                    <Typography>{activeTag.category.subTypeName}</Typography>
                    <Typography>{activeTag.locationName}</Typography>
                  </Box>
                  <div
                    style={{
                      cursor: 'default',
                      width: '100px',
                      height: '36px',
                      borderTop: `18px solid ${status.statusColor}`,
                      borderBottom: `18px solid ${status.statusColor}`,
                      borderLeft: '12px solid transparent',
                      textAlign: 'center'
                    }}
                  >
                    <Typography style={{ position: 'relative', top: '-10px' }}>
                      {status.statusName}
                    </Typography>
                  </div>
                </Box>
                <DetailPart
                  detail={detail}
                  activeTag={activeTag}
                  classes={classes}
                  missionName={missionName}
                  setLargeImg={setLargeImg}
                  setStateDrawer={setStateDrawer}
                  tagMissionIndex={tagMissionIndex}
                />
              </Box>
            </>
          ) : (
            <CircularProgress />
          )}
        </div>
      </Drawer>
      <ChangeStatus
        stateDrawer={stateDrawer}
        activeTag={activeTag}
        setStateDrawer={setStateDrawer}
        classes={classes}
        status={tagStatus[tagMissionIndex]}
      />
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
