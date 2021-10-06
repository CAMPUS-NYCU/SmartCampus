import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { usePlacesWidget } from 'react-google-autocomplete'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'

import { useSnackbar } from 'notistack'
// import MuiAlert from '@material-ui/lab/Alert'
import useMenu from '../../../../utils/hooks/useMenu'
import SearchBarMenu from './SearchBarMenu'
import Fillter from '../Filter/FilterFab'
import yellowfilter from '../../../../assets/images/yellow-filter.svg'
import grayfilter from '../../../../assets/images/gray-filter.svg'
import { useMissionValue } from '../../../../utils/contexts/MissionContext'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    top: theme.spacing(4),
    left: '50%',
    transform: 'translate(-50%, 0)',
    display: 'flex',
    alignItems: 'center',
    maxWidth: 800,
    width: '90%',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    backgroundColor: '#FAFAFA'
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  divider: {
    height: 28
  }
}))
const SearchBar = React.forwardRef((props, ref) => {
  const { menuControls, ...otherProps } = props
  const classes = useStyles()
  const menuControl = useMenu()
  const [open, changeOpen] = useState(false)
  const toggle = () => changeOpen(!open)
  const { enqueueSnackbar } = useSnackbar()
  const { currentStep } = useMissionValue()
  const { ref: materialRef } = usePlacesWidget({
    onPlaceSelected: (place) => {
      console.log(place)
    },
    options: {
      types: ['establishment'],
      componentRestrictions: { country: 'tw' }
    }
  })
  return (
    <div ref={ref} {...otherProps}>
      <Paper className={classes.root}>
        <IconButton
          className={classes.iconButton}
          aria-label='search'
          onClick={() => {
            enqueueSnackbar('尚未開放', { variant: 'error' })
          }}
        >
          <SearchIcon />
        </IconButton>
        <InputBase
          className={classes.input}
          placeholder='Search'
          inputProps={{ 'aria-label': 'search' }}
          disabled
          onClick={() => {
            enqueueSnackbar('尚未開放', { variant: 'error' })
          }}
        />
        <InputBase
          inputRef={materialRef}
          style={{ width: '90%' }}
          placeholder='開始輸入'
        />

        <Divider className={classes.divider} orientation='vertical' />
        <IconButton
          className={classes.iconButton}
          aria-label='filter'
          onClick={currentStep === 1 ? () => {} : () => toggle(open)}
        >
          {open === true ? (
            <img src={yellowfilter} alt='' />
          ) : (
            <img src={grayfilter} alt='' />
          )}
        </IconButton>
        <Divider className={classes.divider} orientation='vertical' />
        <IconButton
          className={classes.iconButton}
          aria-label='menu'
          onClick={currentStep === 1 ? () => {} : menuControl.setOpen}
        >
          <MenuIcon />
        </IconButton>
      </Paper>
      <Fillter open={open} />
      <SearchBarMenu control={menuControl} menuControls={menuControls} />
    </div>
  )
})

SearchBar.propTypes = {
  menuControls: PropTypes.object.isRequired
}

export default SearchBar
