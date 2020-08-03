import React from 'react'

import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import CreateIcon from '@material-ui/icons/Create'
import {
  useMissionValue,
  MissionStep
} from '../../../../contexts/MissionContext'
import { useTagValue } from '../../../../contexts/TagContext'
import ImageUpload from '../../ImageUpload'

function MissionStep3() {
  const {
    missionType,
    selectedCategoryId,
    handleSetSelectedCategoryId,
    selectedMissionId,
    handleSetSelectedMissionId,
    selectedSubOptionId,
    setSelectedSubOptionId,
    moreDescriptionText,
    handleChangeMoreDescriptionText,
    handleSetStep,
    textLocation
  } = useMissionValue()
  const { missionList, categoryList } = useTagValue()
  const { discoveries = [] } =
    missionList.find((mission) => mission.id === selectedMissionId) || {}
  console.log(typeof textLocation)
  return (
    <Grid container spacing={2}>
      {/* * ==================== 1.經緯度標註 ==================== */}
      <Grid container item xs={12} justify='space-between' direction='row'>
        <Box
          display='flex'
          flexDirection='row'
          alignItems='center'
          width='70vw'
          justifyContent='flex-start'
        >
          <LocationOnIcon style={{ color: 'FDCC4F', marginRight: '5px' }} />
          <Typography>將座標放在要標註的位置。</Typography>
        </Box>
        <IconButton onClick={() => handleSetStep(MissionStep.PlaceFlagOnMap)}>
          <CreateIcon fontSize='small' style={{ color: '#E2E2E2' }} />
        </IconButton>
      </Grid>

      {/* * ==================== 2.地點資訊 ==================== */}
      <Grid container item xs={12} justify='space-between' direction='row'>
        <Box
          display='flex'
          flexDirection='row'
          alignItems='center'
          width='70vw'
          justifyContent='flex-start'
        >
          <LocationOnIcon style={{ color: 'FDCC4F', marginRight: '5px' }} />
          <Typography>{textLocation}</Typography>
        </Box>
        <IconButton onClick={() => handleSetStep(MissionStep.PlaceFlagOnMap)}>
          <CreateIcon fontSize='small' style={{ color: '#E2E2E2' }} />
        </IconButton>
      </Grid>

      {/* * ==================== 3.ABC三任務選擇 ==================== */}
      <Grid item xs={12}>
        <Typography>3. 選擇回報任務類型</Typography>
      </Grid>
      {categoryList.map((category) => (
        <Grid key={category.id} item xs={4}>
          <Button
            variant='contained'
            fullWidth
            size='small'
            color={selectedCategoryId === category.id ? 'primary' : 'default'}
            onClick={() => handleSetSelectedCategoryId(category.id)}
          >
            {category.name}
          </Button>
        </Grid>
      ))}

      {/* * ==================== 4.任務mission大類別 ==================== */}
      <Grid item xs={12}>
        <Typography>4. 選擇任務</Typography>
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

      {/* * ==================== 5.任務discovery子類別 ==================== */}
      <Grid item xs={12}>
        <Typography>5. 具體設施</Typography>
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

      {/* * ==================== 6.補充文字框 ==================== */}
      <Grid item xs={12}>
        <Typography>6. 現象描述</Typography>
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

      {/* * ==================== 7.上傳照片 ==================== */}
      <Grid item xs={12}>
        <Typography>7. 相關照片</Typography>
      </Grid>
      <Grid item xs={12}>
        <ImageUpload />
      </Grid>
    </Grid>
  )
}

export default MissionStep3
