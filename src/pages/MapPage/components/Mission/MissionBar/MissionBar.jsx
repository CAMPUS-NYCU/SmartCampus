import React from 'react'

import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import { makeStyles } from '@mui/styles'
import Typography from '@mui/material/Typography'

import { useMissionValue } from '../../../../../utils/contexts/MissionContext'
import Flag from '../../Flag'
import CustomButton from '../../../../../components/CustomButton'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: theme.spacing(4),
    left: '50%',
    transform: 'translate(-50%, 0)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: 800,
    width: '90%'
  }
}))

function MissionBar(props) {
  const classes = useStyles()
  const { handleCloseMission } = useMissionValue()

  return (
    <Paper className={classes.root} {...props}>
      <Box display='flex' alignItems='center'>
        <Box m={1}>
          <Flag />
        </Box>
        <Typography>標注</Typography>
      </Box>
      <Box m={1}>
        <CustomButton
          buttonType='defaultButton'
          className={classes.roundButton}
          variant='outlined'
          size='small'
          onClick={handleCloseMission}
          style={{
            borderRadius: 15
          }}
        >
          取消
        </CustomButton>
      </Box>
    </Paper>
  )
}

export default MissionBar
