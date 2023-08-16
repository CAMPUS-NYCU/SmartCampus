import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Box, Typography, Dialog, DialogTitle } from '@mui/material'
import { Lightbox } from 'react-modal-image'

import tagStatus from '../../../../constants/tagData'
import ChangeStatus from './ChangeStatus'
import DetailPart from './DetailPart'
import { useMissionValue } from '../../../../utils/contexts/MissionContext'
import { useTagValue } from '../../../../utils/contexts/TagContext'
import { useUserValue } from '../../../../utils/contexts/UserContext'
import CustomDrawer from '../../../../components/CustomDrawer'
import { useViewCount } from '../../../../utils/hooks/useViewCount'
import CustomButton from '../../../../components/CustomButton'

function TagDetailDialog(props) {
  const { activeTag, onClose, tagDetail, ...rest } = props
  const { handleStartEdit, isInMission } = useMissionValue()
  const { userAddTags, threshold, fetchTagDetail, deleteTag } = useTagValue()
  const { isGuest } = useUserValue()
  const [largeImg, setLargeImg] = useState(null)
  const [stateDrawer, setStateDrawer] = useState(false)
  const [deleteDialog, setDeleteDialog] = useState(false)
  const { incrementViewCount } = useViewCount()
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
            background: '#FAFAFA',
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
        height='part'
        variant='persistent'
        closeButton={false}
        title='[TODO]: title'
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
                <Typography>{tagDetail.locationName}</Typography>
                <Typography>{tagDetail.floor}樓</Typography>
              </Box>
            </Box>
          )}
          <DetailPart
            tagDetail={tagDetail}
            setLargeImg={setLargeImg}
            setStateDrawer={setStateDrawer}
            threshold={threshold}
          />
        </Box>
      </CustomDrawer>
      {tagDetail.id && (
        <ChangeStatus
          stateDrawer={stateDrawer}
          tagDetail={tagDetail}
          setStateDrawer={setStateDrawer}
          status={(() => tagStatus[0])()}
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
  tagDetail: PropTypes.object.isRequired
}
TagDetailDialog.defaultProps = {
  activeTag: null
}

export default TagDetailDialog
