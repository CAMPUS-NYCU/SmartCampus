import React from 'react';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import AccessibilitySelect from './AccessibilitySelect';
import { SubOptionOther, useMissionValue } from '../../../../contexts/MissionContext';
import { Missions } from '../../../../constants/missionData';

function MissionStep4() {
  const {
    selectedMissionId,
    selectedSubOptionId,
    setSelectedSubOptionId,
    subOptionOtherText,
    handleChangeSubOptionOtherText,
  } = useMissionValue();

  // selectedMission
  const {
    subOption: {
      title = '尚未選擇標註任務，請返回上一步', // 正常流程不會出現
      options = [],
    } = {},
  } = Missions.find((mission) => mission.id === selectedMissionId) || {};

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography>
          4. {title}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          {options.map((option) => (
            <Grid id={option.id} item xs={4}>
              <Button
                variant="contained"
                fullWidth
                size="small"
                color={selectedSubOptionId === option.id ? 'primary' : 'default'}
                onClick={() => setSelectedSubOptionId(option.id)}
              >
                {option.name}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Grid>

      {selectedSubOptionId === SubOptionOther && (
        <Grid item xs={12}>
          <TextField
            name="subOptionOtherText"
            label="其他"
            fullWidth
            margin="dense"
            onChange={handleChangeSubOptionOtherText}
            value={subOptionOtherText}
          />
        </Grid>
      )}

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
