import React, { useRef } from 'react'

import Button from '@material-ui/core/Button'
import { useMissionValue } from '../../contexts/MissionContext'

function ImageUpload() {
  const { setImageFiles } = useMissionValue()
  const changeFiles = (event) => {
    console.log(event.target.files)
    setImageFiles(event.target.files)
  }
  const selectFile = useRef(null)
  const fileButtonClick = () => {
    console.log(selectFile)
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
