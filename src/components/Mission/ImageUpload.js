import React, { useRef } from 'react'

import Button from '@material-ui/core/Button'
import { useMissionValue } from '../../utils/contexts/MissionContext'

function ImageUpload(props) {
  const { imageFiles, setImageFiles } = useMissionValue()
  const { setPreviewImages, previewImages } = props
  const changeFiles = (event) => {
    const images = [...imageFiles]
    const preview = [...previewImages]
    for (let i = 0; i < event.target.files.length; i += 1) {
      images.push(event.target.files[i])
      preview.push(URL.createObjectURL(event.target.files[i]))
    }
    setPreviewImages(preview)
    setImageFiles(images)
  }
  const selectFile = useRef(null)
  const fileButtonClick = () => {
    selectFile.current.click()
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
      <Button
        variant='contained'
        color={imageFiles.length !== 0 ? 'primary' : ''}
        onClick={fileButtonClick}
        style={{
          filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
          borderRadius: '20px'
        }}
      >
        選擇照片
      </Button>
    </>
  )
}

export default ImageUpload
