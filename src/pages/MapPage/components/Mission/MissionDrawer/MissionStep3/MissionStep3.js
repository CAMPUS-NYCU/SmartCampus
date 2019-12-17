import React from 'react';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const Missions = [
  {
    id: 1,
    name: '無障礙設施',
  },
  {
    id: 2,
    name: '道路障礙',
  },
];

function MissionStep3() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography>
      3. 選擇你想要的標注任務
        </Typography>
      </Grid>
      {Missions.map((mission) => (
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
  );
}

export default MissionStep3;
