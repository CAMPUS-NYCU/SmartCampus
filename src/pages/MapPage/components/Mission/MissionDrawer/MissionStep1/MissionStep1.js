import React, { useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import { Button } from '@material-ui/core'
import StreetviewIcon from '@material-ui/icons/Streetview'
import Flag from '../../../Flag'
import inputImg from '../../../../../../assets/images/input-icon.svg'
import {
  useMissionValue,
  MissionStep
} from '../../../../contexts/MissionContext'
import axios from 'axios'
import { REACT_APP_GOOGLE_MAP_API_KEY } from '../../../../../../constants/envValues'

function MissionStep1 () {
  const {
    textLocation,
    handleChangeTextLocation,
    setStep,
    streetViewUpload,
    markerPosition,
    setTextLocation
  } = useMissionValue()
  useEffect(() => {
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${markerPosition.latitude},${markerPosition.longitude}&language=zh-TW&result_type=premise&key=${REACT_APP_GOOGLE_MAP_API_KEY}`
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
        alignItems='center'
        width='200px'
        justifyContent='space-between'
      >
        <Flag />
        <Typography>將放置在要標注的位。</Typography>
      </Box>

      <Box
        mb={2}
        display='flex'
        flexDirection='row'
        // justifyContent='space-between'
        width='80%'
        alignItems='center'
      >
        {/* <inputIcon /> */}
        <img src={inputImg} alt='' />
        <TextField
          id='standard-basic'
          style={{ width: '70%', marginLeft: '10px' }}
          placeholder='輸入地點名稱'
          value={textLocation}
          onChange={handleChangeTextLocation}
        />
      </Box>
      <Box display='flex' alignItems='center'>
        <StreetviewIcon style={{ color: 'FDCC4F', marginRight: '15px' }} />
        <Button
          variant='contained'
          style={{
            filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
            borderRadius: '20px'
          }}
          onClick={() => {
            setStep(MissionStep.PlaceFlagOnStreet)
          }}
          color={streetViewUpload ? 'primary' : ''}
        >
          新增街景
        </Button>
      </Box>
    </>
  )
}

export default MissionStep1
