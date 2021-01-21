import React, { useRef, useState } from 'react'
import { Box, IconButton } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import { useMissionValue } from '../../../../contexts/MissionContext'

const PicturePreview = (props) => {
  const { previewImages, setPreviewImages } = props
  const selectFile = useRef(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const {
    imageFiles,
    setImageFiles,
    setImageDeleteUrls,
    isInEdit
  } = useMissionValue()
  const handleChangeImage = (index) => {
    setSelectedImage(index)
    selectFile.current.click()
  }
  const changeFiles = (event) => {
    const images = []
    const preview = []
    for (let i = 0; i < imageFiles.length; i += 1) {
      if (i === selectedImage) {
        images.push(event.target.files[0])
        preview.push(URL.createObjectURL(event.target.files[0]))
      } else {
        images.push(imageFiles[i])
        preview.push(previewImages[i])
      }
    }
    setPreviewImages(preview)
    setImageFiles(images)
  }
  const handleDeleteImage = (index) => {
    const images = []
    const deleteImages = []
    const preview = []
    if (isInEdit) {
      for (let i = 0; i < imageFiles.length; i += 1) {
        if (i !== index) {
          images.push(imageFiles[i])
          preview.push(previewImages[i])
        }
      }
    }
    else{
      for (let i = 0; i < imageFiles.length; i += 1) {
        if (i !== index) {
          preview.push(previewImages[i])
        }
        else{
          deleteImages.push(previewImages[i])
        }
      }
    }
    setPreviewImages(preview)
    setImageDeleteUrls(deleteImages)
  }
  return (
    <>
      <input
        type='file'
        ref={selectFile}
        accept='image/*'
        style={{ display: 'none' }}
        onChange={changeFiles}
        multiple
      />
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
                  <IconButton onClick={() => handleChangeImage(index)}>
                    <EditIcon style={{ color: 'white' }} />
                  </IconButton>
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
