import React from 'react';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { useMissionValue } from '../../../../contexts/MissionContext';
import { Missions } from '../../../../constants/missionData';

function MissionStep3() {
  const {
    selectedMissionId,
    handleSetSelectedMissionId,
  } = useMissionValue();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography>
          3. 選擇你想要的標注任務
        </Typography>
      </Grid>
      {Missions.map((mission) => (
        <Grid key={mission.id} item xs={4}>
          <Button
            variant="contained"
            fullWidth
            size="small"
            color={selectedMissionId === mission.id ? 'primary' : 'default'}
            onClick={() => handleSetSelectedMissionId(mission.id)}
          >
            {mission.name}
          </Button>
        </Grid>
      ))}
    </Grid>
  );
}

export default MissionStep3;
