import React from 'react'
import { Box, IconButton } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import { useMissionValue } from '../../../../../../utils/contexts/MissionContext'

const PicturePreview = (props) => {
  const { previewImages, setPreviewImages } = props
  const {
    imageFiles,
    setImageFiles,
    setImageDeleteUrls,
    imageDeleteUrls,
    isInEdit
  } = useMissionValue()
  const handleDeleteImage = (index) => {
    const images = []
    const deleteImages = [...imageDeleteUrls]
    const preview = []
    if (!isInEdit) {
      for (let i = 0; i < imageFiles.length; i += 1) {
        if (i !== index) {
          images.push(imageFiles[i])
          preview.push(previewImages[i])
        }
      }
    } else {
      for (let i = 0; i < previewImages.length - imageFiles.length; i += 1) {
        if (i !== index) {
          preview.push(previewImages[i])
        } else {
          deleteImages.push(previewImages[i])
        }
      }
      for (
        let i = previewImages.length - imageFiles.length;
        i < previewImages.length;
        i += 1
      ) {
        if (i !== index) {
          images.push(imageFiles[i])
          preview.push(previewImages[i])
        }
      }
      setImageDeleteUrls(deleteImages)
    }
    setImageFiles(images)
    setPreviewImages(preview)
  }
  return (
    <>
      {previewImages.length !== 0 && (
        <div
          style={{
            width: '100vw',
            height: '150px',
            overflowX: 'scroll',
            display: '-webkit-flex',
            flexDirection: 'row'
          }}
        >
          {previewImages.map((url, index) => {
            return (
              <div
                key={url}
                style={{
                  position: 'relative',
                  marginRight: '5px',
                  width: '180px',
                  flexShrink: '0',
                  overflow: 'hidden',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundImage: `url(${url})`
                }}
              >
                <Box
                  display='flex'
                  flexDirection='row'
                  justifyContent='space-around'
                  alignItems='center'
                  style={{
                    position: 'absolute',
                    bottom: '0',
                    width: '100%',
                    height: '20%',
                    background: 'rgba(0, 0, 0, 0.2)'
                  }}
                >
                  <IconButton onClick={() => handleDeleteImage(index)}>
                    <DeleteIcon style={{ color: 'white' }} />
                  </IconButton>
                </Box>
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}

export default PicturePreview
