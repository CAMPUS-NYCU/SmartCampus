import React from 'react'

import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import { useMissionValue } from '../../../contexts/MissionContext'
import Flag from '../../Flag'

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
  },
  roundButton: {
    borderRadius: 15
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
        <Button
          onClick={handleCloseMission}
          className={classes.roundButton}
          variant='outlined'
          size='small'
        >
          取消
        </Button>
      </Box>
    </Paper>
  )
}

export default MissionBar
