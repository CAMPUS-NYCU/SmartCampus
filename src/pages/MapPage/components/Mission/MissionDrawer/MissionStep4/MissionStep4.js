import React from 'react';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import AccessibilitySelect from './AccessibilitySelect';

const Things = [
  {
    id: 1,
    name: '無障礙設施',
  },
  {
    id: 2,
    name: '扶手',
  },
  {
    id: 3,
    name: '升降梯',
  },
  {
    id: 4,
    name: '樓梯',
  },
  {
    id: 5,
    name: '避難層坡道',
  },
  {
    id: 6,
    name: '廁所',
  },
];

function MissionStep4() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography>
          4. 這裡有什麼？
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          {Things.map((mission) => (
            <Grid id={mission.id} item xs={4}>
              <Button
                variant="contained"
                fullWidth
                size="small"
              >
                {mission.name}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="其他"
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <Typography>
          Accessibility:
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <AccessibilitySelect />
      </Grid>
    </Grid>
  );
}

export default MissionStep4;
