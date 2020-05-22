import React from 'react'

import Rating from '@material-ui/lab/Rating'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import StarBorderIcon from '@material-ui/icons/StarBorder'

import { useMissionValue } from '../../../../contexts/MissionContext'

const textEachStar = [
  '完全無法使用',
  '不方便使用',
  '可以使用，些微損毀',
  '能使用',
  '方便使用'
]
const textMin = '不能使用'
const textMax = '方便使用'

function AccessibilitySelect() {
  const { selectedSubRate, setSelectedSubRate } = useMissionValue()

  return (
    <div>
      <Box display='flex' justifyContent='center' mt={1}>
        <Rating
          value={selectedSubRate}
          onChange={(event, newValue) => {
            setSelectedSubRate(newValue)
          }}
          max={textEachStar.length}
          size='large'
          emptyIcon={<StarBorderIcon fontSize='inherit' />}
        />
      </Box>

      <Box display='flex' justifyContent='space-between' mb={1}>
        <Typography variant='body2'>{textMin}</Typography>
        <Typography variant='body2'>{textMax}</Typography>
      </Box>

      <Box my={4}>
        <Typography variant='subtitle1' align='center' color='primary'>
          {textEachStar[selectedSubRate - 1]}
        </Typography>
      </Box>
    </div>
  )
}

export default AccessibilitySelect
