import React, { useEffect } from 'react'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import axios from 'axios'
import Flag from '../../../Flag'
import { useMissionValue } from '../../../../../../utils/contexts/MissionContext'
import { VITE_GOOGLE_MAP_API_KEY } from '../../../../../../constants/envValues'

function MissionStep1() {
  const {
    textLocation,
    handleChangeTextLocation,
    markerPosition,
    setTextLocation
  } = useMissionValue()
  useEffect(() => {
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${markerPosition.latitude},${markerPosition.longitude}&language=zh-TW&result_type=premise&key=${VITE_GOOGLE_MAP_API_KEY}`
      )
      .then(({ data }) => {
        setTextLocation(
          data.status === 'OK'
            ? data.results[0].address_components[0].long_name
            : ''
        )
      })
  }, [markerPosition, setTextLocation])
  return (
    <>
      <Box
        mb={2}
        display='flex'
        flexDirection='row'
        alignItems='top'
        width='90%'
      >
        <Flag />
        &nbsp;
        <Box display='flex' flexDirection='column' alignItems='top' width='90%'>
          <Typography>移動上方地圖將座標放置在回報位置</Typography>
          <TextField
            id='standard-basic'
            sx={{ width: '70%', input: { fontSize: '12px', color: '#777777' } }}
            placeholder='輸入地點名稱'
            value={textLocation}
            onChange={handleChangeTextLocation}
            variant='standard'
          />
        </Box>
      </Box>
    </>
  )
}

export default MissionStep1
