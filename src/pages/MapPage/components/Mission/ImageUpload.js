import React from 'react'

import Button from '@material-ui/core/Button'
import { useMissionValue } from '../../contexts/MissionContext'

function ImageUpload() {
  const { setImageFiles } = useMissionValue()
  const changeFiles = (event) => {
    setImageFiles(event.target.files)
  }
  return (
    <>
      <input type='file' onChange={changeFiles} multiple />
      <Button variant='contained'>選擇照片</Button>
    </>
  )
}

export default ImageUpload
