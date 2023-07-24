import React from 'react'

import Typography from '@mui/material/Typography'
import NativeSelect from '@mui/material/NativeSelect'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import StairsIcon from '@mui/icons-material/Stairs'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import { useMissionValue } from '../../../../../../utils/contexts/MissionContext'
import ImageUpload from '../../../../../../utils/functions/ImageUpload'
import PicturePreview from './PicturePreview'

function MissionStep2() {
  const {
    textLocation,
    handleChangeTextLocation,
    previewImages,
    setPreviewImages,
    floor,
    setFloor
  } = useMissionValue()

  const handleChangeFloor = (event) => {
    setFloor(event.target.value)
  }
  return (
    <>
      <Grid container spacing={3}>
        <Grid
          container
          item
          xs={12}
          justifyContent='space-between'
          direction='row'
        >
          <Box
            display='flex'
            flexDirection='row'
            alignItems='center'
            justifyContent='flex-start'
          >
            <LocationOnIcon style={{ color: 'FDCC4F', marginRight: '5px' }} />
            <Box flexGrow={1}>
              <Typography>回報地點</Typography>
            </Box>
            <TextField
              id='standard-basic'
              sx={{
                input: { fontSize: '12px', color: '#777777' }
              }}
              placeholder='輸入地點名稱'
              value={textLocation}
              onChange={handleChangeTextLocation}
              variant='standard'
            />
          </Box>
        </Grid>

        <Grid
          container
          item
          xs={12}
          justifyContent='space-between'
          direction='row'
        >
          <Box
            display='flex'
            flexDirection='row'
            alignItems='center'
            width='100vw'
            justifyContent='flex-start'
          >
            <StairsIcon style={{ color: 'FDCC4F', marginRight: '5px' }} />
            <Box flexGrow={1}>
              <Typography>目標樓層</Typography>
            </Box>
            <NativeSelect
              native='true'
              onChange={handleChangeFloor}
              value={floor}
              style={{
                direction: 'rtl',
                borderRadius: '5px',
                boxShadow: (() => {
                  if (floor !== 0) {
                    return '0px 2px 4px rgba(0, 0, 0, 0.12)'
                  }
                  return ''
                })(),
                backgroundColor: (() => {
                  if (floor !== 0) {
                    return '#FDCC4F'
                  }
                  return ''
                })()
              }}
            >
              <option value={0}>無</option>
              <option value={-1}>B1</option>
              <option value={-2}>B2</option>
              <option value={1}>1樓</option>
              <option value={2}>2樓</option>
              <option value={3}>3樓</option>
              <option value={4}>4樓</option>
              <option value={5}>5樓</option>
              <option value={6}>6樓</option>
              <option value={7}>7樓</option>
              <option value={8}>8樓</option>
              <option value={9}>9樓</option>
              <option value={10}>10樓</option>
            </NativeSelect>
          </Box>
        </Grid>

        <Grid container item xs={12} direction='row' alignItems='center'>
          <AddAPhotoIcon style={{ color: 'FDCC4F', marginRight: '15px' }} />
          <ImageUpload
            setPreviewImages={setPreviewImages}
            previewImages={previewImages}
          />
        </Grid>
        <PicturePreview
          previewImages={previewImages}
          setPreviewImages={setPreviewImages}
        />
      </Grid>
    </>
  )
}

export default MissionStep2
