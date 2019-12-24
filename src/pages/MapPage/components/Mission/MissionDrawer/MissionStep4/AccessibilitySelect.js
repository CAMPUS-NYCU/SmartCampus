import React from 'react';

import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import StarBorderIcon from '@material-ui/icons/StarBorder';

import { Missions } from '../../../../constants/missionData';
import { useMissionValue } from '../../../../contexts/MissionContext';

function AccessibilitySelect() {
  const {
    selectedMissionId,
    selectedSubRate,
    setSelectedSubRate,
  } = useMissionValue();

  // selectedMission
  const {
    subRate: {
      textMin = '',
      textMax = '',
      textEachStar = [],
    } = {},
  } = Missions.find((mission) => mission.id === selectedMissionId) || {};

  return (
    <div>
      <Box display="flex" justifyContent="center" mt={1}>
        <Rating
          value={selectedSubRate}
          onChange={(event, newValue) => {
            setSelectedSubRate(newValue);
          }}
          max={textEachStar.length}
          size="large"
          emptyIcon={<StarBorderIcon fontSize="inherit" />}
        />
      </Box>

      <Box display="flex" justifyContent="space-between" mb={1}>
        <Typography variant="body2">
          {textMin}
        </Typography>
        <Typography variant="body2">
          {textMax}
        </Typography>
      </Box>

      <Box my={4}>
        <Typography variant="subtitle1" align="center" color="primary">
          {textEachStar[selectedSubRate - 1]}
        </Typography>
      </Box>
    </div>
  );
}

export default AccessibilitySelect;
