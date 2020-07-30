import React from 'react'

import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import Flag from '../../../Flag'
import inputImg from '../../../../../../assets/images/input-icon.svg'

function MissionStep1() {
  return (
    <>
      <Box
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
        display='flex'
        flexDirection='row'
        justifyContent='space-between'
        width='80vw'
        alignItems='center'
      >
        {/* <inputIcon /> */}
        <img src={inputImg} alt='' />
        <TextField
          id='standard-basic'
          style={{ width: '70vw' }}
          placeholder='輸入地點名稱'
        />
      </Box>
    </>
  )
}

export default MissionStep1
