import React, { useState, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Box, Typography, Dialog, DialogTitle } from '@material-ui/core'
import { Lightbox } from 'react-modal-image'

import Mission2 from '../../../../assets/images/mission2_round.svg'
import Mission1 from '../../../../assets/images/mission1_round.svg'
import Mission3 from '../../../../assets/images/mission3_round.svg'
import Mission2Voting from '../../../../assets/images/mission2_round_voting.svg'
import { missionInfo } from '../../../../constants/missionInfo'
import tagStatus from '../../../../constants/tagData'
import { useMissionValue } from '../../../../utils/contexts/MissionContext'
import { useTagValue } from '../../../../utils/contexts/TagContext'
import { useUserValue } from '../../../../utils/contexts/UserContext'
import CustomDrawer from '../../../../components/CustomDrawer'
import { useViewCount } from '../../../../utils/hooks/useViewCount'
import CustomButton from '../../../../components/CustomButton'

function TagDetailDialog(props) {
  const { activeTag, onClose, tagDetail, ...rest } = props
  const { handleStartEdit, isInMission } = useMissionValue()
  const { userAddTags, fetchTagDetail, deleteTag } = useTagValue()
  const { isGuest } = useUserValue()
  const [largeImg, setLargeImg] = useState(null)
  const [deleteDialog, setDeleteDialog] = useState(false)
  const { incrementViewCount } = useViewCount()
  const missionImage = useMemo(() => [Mission1, Mission2, Mission3], [])
  const mission2ImageVoting = useMemo(() => [Mission2Voting], [])
  const missionName = useMemo(
    () =>
      missionInfo.map((mission) => {
        return mission.missionName
      }),
    []
  )
  const tagMissionIndex = useMemo(
    () =>
      missionName.findIndex(
        (mission) => mission === activeTag.category.missionName
      ),
    [activeTag.category.missionName, missionName]
  )
  const tagStatusIndex = useMemo(
    () =>
      tagStatus[tagMissionIndex].findIndex(
        (status) => status.statusName === tagDetail.status.statusName || ''
      ),
    [tagDetail.status.statusName, tagMissionIndex]
  )
  const status = useMemo(
    () => tagStatus[tagMissionIndex][tagStatusIndex] || tagStatus[0][0],
    [tagMissionIndex, tagStatusIndex]
  )
  const checkTagOwner = () => {
    if (userAddTags) {
      return userAddTags.find((userAddTag) => userAddTag.id === activeTag.id)
    }
    return false
  }
  useEffect(() => {
    if (!isGuest) {
      incrementViewCount(activeTag.id)
    }
  }, [incrementViewCount, activeTag, isGuest])
  useEffect(() => {
    fetchTagDetail()
  }, [fetchTagDetail])
  return (
    <>
      <Dialog
        open={deleteDialog}
        PaperProps={{
          style: {
            background: 'r #FAFAFA',
            boxShadow: `0px 2px 4px rgba(0, 0, 0, 0.12), 0px 3px 4px rgba(0, 0, 0, 0.12), 0px 1px 5px rgba(0, 0, 0, 0.2)`,
            borderRadius: `10px`,
            padding: '10px'
          }
        }}
      >
        <DialogTitle>確定要刪除?</DialogTitle>
        <Box
          width='100%'
          mb={2}
          mt={3}
          display='flex'
          justifyContent='space-around'
        >
          <CustomButton
            buttonType='finishButton'
            onClick={() => {
              setDeleteDialog(false)
            }}
          >
            取消
          </CustomButton>
          <CustomButton
            buttonType='finishButton'
            onClick={() => {
              deleteTag(activeTag.id)
              onClose()
            }}
          >
            確定
          </CustomButton>
        </Box>
      </Dialog>
      <CustomDrawer
        open={activeTag && !isInMission}
        handleClose={onClose}
        fullHeight
        closeButton={false}
        title={
          activeTag && tagMissionIndex === 2
            ? activeTag.category.subTypeName
            : activeTag.category.targetName || '詳細資訊'
        }
        titleActions={
          checkTagOwner()
            ? [
                {
                  name: '刪除',
                  handleOnClick: () => {
                    setDeleteDialog(true)
                  },
                  disabled: !tagDetail
                },
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
          {tagDetail.id && (
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
                <img
                  src={
                    tagDetail.status.statusName === '已解決'
                      ? mission2ImageVoting[0]
                      : missionImage[tagMissionIndex]
                  }
                  alt=''
                />
                <Typography>
                  {tagMissionIndex !== 2 ? activeTag.category.subTypeName : ''}
                </Typography>
                <Typography>{tagDetail.locationName}</Typography>
                {tagDetail.floor === 0 ? (
                  ''
                ) : (
                  <>
                    {tagDetail.floor < 0 ? (
                      <Typography>B{-1 * tagDetail.floor}樓</Typography>
                    ) : (
                      <Typography>{tagDetail.floor}樓</Typography>
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
          )}
        </Box>
      </CustomDrawer>
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
  tagDetail: PropTypes.object.isRequired
}
TagDetailDialog.defaultProps = {
  activeTag: null
}

export default TagDetailDialog
