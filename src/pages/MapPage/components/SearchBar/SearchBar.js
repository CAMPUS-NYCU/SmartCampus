import React from 'react'
import PropTypes from 'prop-types'

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

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: theme.spacing(4),
    left: '50%',
    transform: 'translate(-50%, 0)',
    display: 'flex',
    alignItems: 'center',
    maxWidth: 800,
    width: '90%'
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
  const { menuControls, signOut, ...otherProps } = props
  const classes = useStyles()
  const menuControl = useMenu()
  const { enqueueSnackbar } = useSnackbar()
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
        <Divider className={classes.divider} orientation='vertical' />
        <IconButton
          className={classes.iconButton}
          aria-label='menu'
          onClick={menuControl.setOpen}
        >
          <MenuIcon />
        </IconButton>
      </Paper>

      <SearchBarMenu
        control={menuControl}
        menuControls={menuControls}
        signOut={signOut}
      />
    </div>
  )
})

SearchBar.propTypes = {
  menuControls: PropTypes.object.isRequired
}

export default SearchBar
