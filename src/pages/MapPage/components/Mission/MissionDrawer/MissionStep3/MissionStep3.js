import React from 'react'

import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

import { useMissionValue } from '../../../../contexts/MissionContext'
import { useTagValue } from '../../../../contexts/TagContext'
import AccessibilitySelect from '../../AccessibilitySelect'
import ImageUpload from '../../ImageUpload'

function MissionStep3() {
  const {
    selectedMissionId,
    handleSetSelectedMissionId,
    selectedSubOptionId,
    setSelectedSubOptionId,
    moreDescriptionText,
    handleChangeMoreDescriptionText
  } = useMissionValue()
  const { missionList } = useTagValue()
  const { discoveries = [] } =
    missionList.find((mission) => mission.id === selectedMissionId) || {}

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography>3. 選擇你想要的標注任務</Typography>
      </Grid>
      {missionList.map((mission) => (
        <Grid key={mission.id} item xs={4}>
          <Button
            variant='contained'
            fullWidth
            size='small'
            color={selectedMissionId === mission.id ? 'primary' : 'default'}
            onClick={() => handleSetSelectedMissionId(mission.id)}
          >
            {mission.name}
          </Button>
        </Grid>
      ))}

      <Grid item xs={12}>
        <Typography>4. 這裡有什麼？</Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          {discoveries.map((discovery) => (
            <Grid id={discovery.id} item xs={4}>
              <Button
                variant='contained'
                fullWidth
                size='small'
                color={
                  selectedSubOptionId === discovery.id ? 'primary' : 'default'
                }
                onClick={() => setSelectedSubOptionId(discovery.id)}
              >
                {discovery.name}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Typography>Accessibility</Typography>
      </Grid>
      <Grid item xs={12}>
        <AccessibilitySelect />
      </Grid>

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

export default MissionStep3
