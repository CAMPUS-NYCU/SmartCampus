import React, { useEffect, useState } from 'react'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import AllReferMarkers from './AllReferMarkers'

// const regoinList = ['暖身題', '密度高-室內單', '密度高-室內多', '密度高-室外', '密度低-室內單', '密度低-室外', '空間-室內單', '空間-室內多', '空間-室外']
const locationList = [
  '小木屋和校計中',
  '游泳館&綜合球館',
  '圖書館',
  '活動中心&一餐',
  '工三&工四',
  '室外球場',
  '二餐&停車場',
  '舊體育館'
]

function ReferMarkerFab() {
  const [anchorEl, setAnchorEl] = useState(null)
  const [checkedItems, setCheckedItems] = useState(new Array(8).fill(false)) // 8 is length of locationList
  const [checkedLocations, setCheckedLocations] = useState([])

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleToggle = (index) => {
    const newCheckedItems = [...checkedItems]
    newCheckedItems[index] = !newCheckedItems[index]
    setCheckedItems(newCheckedItems)
  }

  useEffect(() => {
    const selectedLocations = []

    checkedItems.map((checked, index) => {
      if (checked) {
        selectedLocations.push(locationList[index])
      }
      return null
    })
    setCheckedLocations(selectedLocations)
  }, [checkedItems])

  return (
    <>
      <div>
        <Button aria-haspopup='true' onClick={handleMenuClick}>
          可回報項目位置
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          MenuListProps={{ 'aria-labelledby': 'checkbox-menu' }}
        >
          {locationList.map((location, index) => {
            return (
              <MenuItem key={location}>
                <ListItemIcon>
                  <Checkbox
                    checked={checkedItems[index]}
                    onChange={() => handleToggle(index)}
                  />
                </ListItemIcon>
                <ListItemText primary={location} />
              </MenuItem>
            )
          })}
        </Menu>
      </div>
      <AllReferMarkers locations={checkedLocations} />
    </>
  )
}

export default ReferMarkerFab
