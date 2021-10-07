import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
<<<<<<< HEAD
<<<<<<< HEAD
=======
import { usePlacesWidget } from 'react-google-autocomplete'
>>>>>>> 9a309b3 (Add default google map autocomplete api)
=======
>>>>>>> 49e2e8b (Open search function)
import { makeStyles } from '@material-ui/core/styles'
import { usePlacesWidget } from 'react-google-autocomplete'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
<<<<<<< HEAD
<<<<<<< HEAD
import CloseIcon from '@material-ui/icons/Close'
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn'
=======

>>>>>>> 9a309b3 (Add default google map autocomplete api)
=======
import CloseIcon from '@material-ui/icons/Close'
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn'
>>>>>>> 49e2e8b (Open search function)
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
  const {
    menuControls,
    setPlacePosition,
    search,
    setSearch,
    setPlaceName,
    ...otherProps
  } = props
  const classes = useStyles()
  const menuControl = useMenu()
  const [open, changeOpen] = useState(false)
  const toggle = () => changeOpen(!open)
  const { enqueueSnackbar } = useSnackbar()
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 49e2e8b (Open search function)
  const { currentStep, setMapCenter } = useMissionValue()
  const bounds = {
    north: 24.791768,
    south: 24.782687,
    east: 121.000443,
    west: 120.995352
  }
<<<<<<< HEAD
  const [positionName, setPositionName] = useState('')
  useEffect(() => {
    setPlaceName(positionName)
    document.getElementById('inputBase').value = positionName
  }, [positionName, setPlaceName])

  const { ref: materialRef } = usePlacesWidget({
    onPlaceSelected: (Place) => {
      if (Place.place_id !== undefined) {
        setSearch(true)
        const placeName = document
          .getElementById('inputBase')
          .value.split('新竹市東區')[1]
        if (placeName === undefined) {
          enqueueSnackbar('地址超過搜尋範圍', { variant: 'error' })
        } else {
          if (placeName.split('路')[1] === undefined) {
            setPositionName(placeName)
          } else {
            setPositionName(placeName.split('路')[1])
          }
          setPlacePosition(Place.geometry.location)
          setMapCenter(Place.geometry.location)
        }
      } else {
        document.getElementById('inputBase').value = ''
      }
    },
    options: {
      bounds,
=======
  const { currentStep } = useMissionValue()
=======
>>>>>>> 49e2e8b (Open search function)
  const { ref: materialRef } = usePlacesWidget({
    onPlaceSelected: (Place) => {
      if (Place.place_id !== undefined) {
        setSearch(true)
        const placeName = document
          .getElementById('inputBase')
          .value.split('新竹市東區')[1]
        if (placeName === undefined) {
          enqueueSnackbar('地址超過搜尋範圍', { variant: 'error' })
        } else {
          if (placeName.split('路')[1] === undefined) {
            setPlaceName(placeName)
          }
          setPlaceName(placeName.split('路')[1])
          setPlacePosition(Place.geometry.location)
          setMapCenter(Place.geometry.location)
        }
      } else {
        document.getElementById('inputBase').value = ''
      }
    },
    options: {
<<<<<<< HEAD
>>>>>>> 9a309b3 (Add default google map autocomplete api)
=======
      bounds,
>>>>>>> 49e2e8b (Open search function)
      types: ['establishment'],
      componentRestrictions: { country: 'tw' }
    }
  })
  return (
    <div ref={ref} {...otherProps}>
      <Paper className={classes.root}>
        {search === false ? (
          <IconButton
            className={classes.iconButton}
            aria-label='search'
            onClick={() => {
              document.getElementById('inputBase').focus()
              setSearch(true)
            }}
          >
            <SearchIcon />
          </IconButton>
        ) : (
          <IconButton
            className={classes.iconButton}
            aria-label='search'
            onClick={() => {
              document.getElementById('inputBase').blur()
              setSearch(false)
              setPlaceName('')
            }}
          >
            <KeyboardReturnIcon />
          </IconButton>
        )}

<<<<<<< HEAD
        <InputBase
          id='inputBase'
          inputRef={materialRef}
          style={{ width: '90%' }}
          placeholder='開始輸入'
          onClick={() => {
            setSearch(true)
          }}
        />
<<<<<<< HEAD
        {search === true ? (
          <>
            <IconButton
              className={classes.iconButton}
              aria-label='search'
              onClick={() => {
                document.getElementById('inputBase').value = ''
                document.getElementById('inputBase').focus()
                setPlaceName('')
              }}
            >
              <CloseIcon />
            </IconButton>
          </>
        ) : (
          ''
        )}
=======
=======
>>>>>>> 49e2e8b (Open search function)
        <InputBase
          id='inputBase'
          inputRef={materialRef}
          style={{ width: '90%' }}
          placeholder='開始輸入'
          onClick={() => {
            setSearch(true)
          }}
        />
<<<<<<< HEAD

>>>>>>> 9a309b3 (Add default google map autocomplete api)
=======
        {search === true ? (
          <>
            <IconButton
              className={classes.iconButton}
              aria-label='search'
              onClick={() => {
                document.getElementById('inputBase').value = ''
                setPlaceName('')
              }}
            >
              <CloseIcon />
            </IconButton>
          </>
        ) : (
          ''
        )}
>>>>>>> 49e2e8b (Open search function)
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
