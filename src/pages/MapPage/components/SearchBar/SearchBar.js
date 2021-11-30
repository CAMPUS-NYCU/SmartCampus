import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { usePlacesWidget } from 'react-google-autocomplete'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import CloseIcon from '@material-ui/icons/Close'
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn'
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
  const { currentStep, setMapCenter } = useMissionValue()
  const bounds = {
    north: 24.790953568920005,
    south: 24.78259189570934,
    east: 121.00204344319231,
    west: 120.99299198044952
  }
  const [positionName, setPositionName] = useState('')
  const checkRange = (lat, lng) => {
    if (lat < bounds.north && lat > bounds.south) {
      if (lng < bounds.east && lng > bounds.west) {
        return true
      }
    } // 利用經緯度判斷是否在光復校區 目前以 西區滯洪池 電子資訊中心 研三 交清小徑 作為判斷依據
    return false
  }
  useEffect(() => {
    setPlaceName(positionName)
    document.getElementById('inputBase').value = positionName
  }, [positionName, setPlaceName])
  const { ref: materialRef } = usePlacesWidget({
    onPlaceSelected: (Place) => {
      if (Place.place_id !== undefined) {
        setSearch(true)
        const searchplaceName = document
          .getElementById('inputBase')
          .value.split('新竹市東區')[1]
        const inRange = checkRange(
          Place.geometry.location.lat(),
          Place.geometry.location.lng()
        )
        if (!inRange) {
          enqueueSnackbar('地址超過搜尋範圍', { varient: 'error' })
          document.getElementById('inputBase').value = ''
        } else {
          // 地名有時候會多大學路 因此要多一個 split
          if (searchplaceName.split('路')[1] === undefined) {
            setPositionName(searchplaceName)
          } else {
            setPositionName(searchplaceName.split('路')[1])
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
              document.getElementById('inputBase').value = ''
              setSearch(false)
              setPlaceName('')
            }}
          >
            <KeyboardReturnIcon />
          </IconButton>
        )}
        <InputBase
          id='inputBase'
          inputRef={materialRef}
          style={{ width: '90%' }}
          placeholder='開始輸入'
          onClick={() => {
            setSearch(true)
          }}
        />
        {search === true && (
          <IconButton
            className={classes.iconButton}
            aria-label='closeIcon'
            onClick={() => {
              document.getElementById('inputBase').value = ''
              document.getElementById('inputBase').focus()
              setPlaceName('')
              setPositionName('')
            }}
          >
            <CloseIcon />
          </IconButton>
        )}
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
