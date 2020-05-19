import React from 'react';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import AccessibilitySelect from './AccessibilitySelect';
import { useMissionValue } from '../../../../contexts/MissionContext';
import { useTagValue } from '../../../../contexts/TagContext';

function MissionStep4() {
  const {
    selectedMissionId,
    selectedSubOptionId,
    setSelectedSubOptionId,
  } = useMissionValue();
  const {
    missionList,
  } = useTagValue();

  const {
    discoveries = [],
  } = missionList.find((mission) => mission.id === selectedMissionId) || {};

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography>
          4. 這裡有什麼？
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          {discoveries.map((discovery) => (
            <Grid id={discovery.id} item xs={4}>
              <Button
                variant="contained"
                fullWidth
                size="small"
                color={selectedSubOptionId === discovery.id ? 'primary' : 'default'}
                onClick={() => setSelectedSubOptionId(discovery.id)}
              >
                {discovery.name}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Typography>
          Accessibility
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <AccessibilitySelect />
      </Grid>
    </Grid>
  );
}

export default MissionStep4;
