import React, { useRef } from 'react'
import { useMissionValue } from '../contexts/MissionContext'
import CustomButton from '../../components/CustomButton'
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

      <CustomButton
        color={imageFiles.length !== 0 ? 'primary' : 'default'}
        variant='contained'
        onClick={fileButtonClick}
        borderRadius='20px'
        children='選擇照片'
      ></CustomButton>     
    </>
  )
}

export default ImageUpload
