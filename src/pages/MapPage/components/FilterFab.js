import React from 'react'

import Fab from '@material-ui/core/Fab'
import { makeStyles } from '@material-ui/core/styles'
import MapIcon from '@material-ui/icons/Map'
import IconButton from '@material-ui/core/IconButton'
import AccessibleIcon from '@material-ui/icons/Accessible'
import Box from '@material-ui/core/Box'
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
      <Fab
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
      </Popover>
    </>
  )
}

export default FilterFab
