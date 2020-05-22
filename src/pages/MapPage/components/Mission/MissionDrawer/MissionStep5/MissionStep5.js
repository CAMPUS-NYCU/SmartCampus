import React from 'react'

import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'

import ImageUpload from './ImageUpload'
import { useMissionValue } from '../../../../contexts/MissionContext'

function MissionStep5() {
  const {
    moreDescriptionText,
    handleChangeMoreDescriptionText
  } = useMissionValue()

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography>5. 關於這地點的描述？</Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          name='moreDescriptionText'
          multiline
          variant='outlined'
          rows={5}
          placeholder='描述...'
          fullWidth
          value={moreDescriptionText}
          onChange={handleChangeMoreDescriptionText}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography>6. 相關的照片</Typography>
      </Grid>
      <Grid item xs={12}>
        <ImageUpload />
      </Grid>
    </Grid>
  )
}

export default MissionStep5
