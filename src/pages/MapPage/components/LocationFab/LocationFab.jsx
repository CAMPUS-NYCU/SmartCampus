import React from 'react'
import { Fab } from '@mui/material'
import { makeStyles } from '@mui/styles'
import NearMeIcon from '@mui/icons-material/NearMe'

const useStyles = makeStyles({
  fab: {
    position: 'fixed',
    top: 150,
    right: 24,
    zIndex: 10
  }
})

const LocationFab = (props) => {
  const { setMapCenter } = props
  const classes = useStyles()
  return (
    <Fab
      className={classes.fab}
      size='medium'
      color='secondary'
      style={{
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
      }}
      onClick={setMapCenter}
    >
      <NearMeIcon style={{ color: 'white' }} />
    </Fab>
  )
}

export default LocationFab
