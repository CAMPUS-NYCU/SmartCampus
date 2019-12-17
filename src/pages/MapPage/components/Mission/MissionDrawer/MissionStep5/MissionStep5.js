import React from 'react';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import ImageUpload from './ImageUpload'

function MissionStep5() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography>
          5. 關於這地點的描述？
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          multiline
          variant="outlined"
          rows={5}
          placeholder="描述..."
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <Typography>
          6. 相關的照片
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <ImageUpload />
      </Grid>
    </Grid>
  );
}

export default MissionStep5;
