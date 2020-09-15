import React from 'react'

import Fab from '@material-ui/core/Fab'
import { makeStyles } from '@material-ui/core/styles'
import MapIcon from '@material-ui/icons/Map'
import IconButton from '@material-ui/core/IconButton'
import AccessibleIcon from '@material-ui/icons/Accessible'
import Box from '@material-ui/core/Box'
import { Grid, Button } from '@material-ui/core'
import Popover from '@material-ui/core/Popover'
import {
  usePopupState,
  bindToggle,
  bindPopover
} from 'material-ui-popup-state/hooks'

import { useTagValue } from '../contexts/TagContext'

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'absolute',
    top: 96,
    right: 24
  },
  grid: {
    position: 'absolute',
    top: 96,
    left: '5%'
  },
  button: {
    background: '#EEEEEE',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: '5px'
  },
  missionButton: {
    border: 'solid 1px #707070',
    margin: theme.spacing(1)
  },
  discoveryButton: {
    border: 'solid 1px #707070',
    margin: theme.spacing(1),
    boxSizing: 'content-box',
    width: 16,
    height: 16
  },
  discoveryIcon: {
    width: 16,
    height: 16
  }
}))

function FilterFab() {
  const classes = useStyles()
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'filterPopover'
  })
  const { missionList } = useTagValue()

  return (
    <>
      <Box
        width='85%'
        display='flex'
        justifyContent='space-between'
        className={classes.grid}
      >
        <Button className={classes.button}>無障礙設施</Button>
        <Button className={classes.button}>路障</Button>
        <Button className={classes.button}>排隊情況</Button>
        <Button className={classes.button}>更多</Button>
      </Box>
      {/* <Fab
        color='primary'
        aria-label='filter'
        className={classes.fab}
        size='medium'
        {...bindToggle(popupState)}
      >
        <MapIcon />
      </Fab>
      <Popover
        {...bindPopover(popupState)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <Box display='flex' flexDirection='column' alignItems='center'>
          {missionList &&
            missionList.map((mission) => (
              <>
                <IconButton
                  aria-label='mission'
                  size='small'
                  className={classes.missionButton}
                >
                  <AccessibleIcon />
                </IconButton>
                {mission.discoveries.map((discovery) => (
                  <IconButton
                    aria-label='mission'
                    size='small'
                    className={classes.discoveryButton}
                  >
                    <AccessibleIcon className={classes.discoveryIcon} />
                  </IconButton>
                ))}
              </>
            ))}
        </Box>
      </Popover> */}
    </>
  )
}

export default FilterFab
