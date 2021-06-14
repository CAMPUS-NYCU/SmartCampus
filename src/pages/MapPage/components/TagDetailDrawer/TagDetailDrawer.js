import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Box, Typography } from '@material-ui/core'
import { Lightbox } from 'react-modal-image'

import Mission2 from '../../../../assets/images/mission2circle.svg'
import Mission1 from '../../../../assets/images/mission1circle.svg'
import Mission3 from '../../../../assets/images/mission3circle.svg'
import { missionInfo } from '../../../../constants/missionInfo'
import tagStatus from '../../../../constants/tagData'
import ChangeStatus from './ChangeStatus'
import DetailPart from './DetailPart'
import { useMissionValue } from '../../../../utils/contexts/MissionContext'
import { useTagValue } from '../../../../utils/contexts/TagContext'
import CustomDrawer from '../../../../components/CustomDrawer'
import { useViewCount } from '../../../../utils/hooks/useViewCount'

function TagDetailDialog(props) {
  const { activeTag, onClose, deny, guest, tagDetail, ...rest } = props
  const { handleStartEdit, isInMission } = useMissionValue()
  const { userAddTags, threshold, fetchTagDetail } = useTagValue()
  const [largeImg, setLargeImg] = useState(null)
  const [stateDrawer, setStateDrawer] = useState(false)
  const { incrementViewCount } = useViewCount()
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
  const checkTagOwner = () => {
    if (userAddTags) {
      return userAddTags.find((userAddTag) => userAddTag.id === activeTag.id)
    }
    return false
  }
  useEffect(() => {
    incrementViewCount(activeTag.id)
  }, [incrementViewCount, activeTag])
  useEffect(() => {
    fetchTagDetail()
  }, [fetchTagDetail])
  return (
    <>
      <CustomDrawer
        open={activeTag && !isInMission}
        handleClose={onClose}
        fullHeight
        closeButton={false}
        title={activeTag ? activeTag.category.targetName : '詳細資訊'}
        titleActions={
          checkTagOwner()
            ? [
                {
                  name: '編輯',
                  handleOnClick: () => handleStartEdit(activeTag),
                  disable: !tagDetail
                }
              ]
            : []
        }
        {...rest}
      >
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
              {activeTag.floor === 0 ? (
                ''
              ) : (
                <>
                  {activeTag.floor < 0 ? (
                    <Typography>B{-1 * activeTag.floor}樓</Typography>
                  ) : (
                    <Typography>{activeTag.floor}樓</Typography>
                  )}
                </>
              )}
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
            detail={tagDetail}
            activeTag={activeTag}
            missionName={missionName}
            setLargeImg={setLargeImg}
            setStateDrawer={setStateDrawer}
            tagMissionIndex={tagMissionIndex}
            deny={deny}
            guest={guest}
            threshold={threshold}
          />
        </Box>
      </CustomDrawer>
      {tagDetail && (
        <ChangeStatus
          stateDrawer={stateDrawer}
          activeTag={activeTag}
          setStateDrawer={setStateDrawer}
          status={tagStatus[tagMissionIndex]}
        />
      )}
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

TagDetailDialog.propTypes = {
  activeTag: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  deny: PropTypes.func.isRequired,
  guest: PropTypes.bool.isRequired,
  tagDetail: PropTypes.object.isRequired
}
TagDetailDialog.defaultProps = {
  activeTag: null
}

export default TagDetailDialog
