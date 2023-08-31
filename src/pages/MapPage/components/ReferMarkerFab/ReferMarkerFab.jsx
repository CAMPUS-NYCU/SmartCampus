import React, { useEffect, useState } from 'react'
import { makeStyles } from '@mui/styles'
import CustomButton from '../../../../components/CustomButton'

import AllReferMarkers from './AllReferMarkers'
import { findCategories } from '../../../../constants/res1ReferMarkers'

const useStyles = makeStyles(() => ({
  grid: {
    position: 'absolute',
    transform: 'translate(-50%, 0)',
    top: '32px',
    width: '100vw',
    height: '35px',
    flexGrow: '1',
    overflowX: 'scroll',
    overflowY: 'auto',
    display: '-webkit-flex',
    flexDirection: 'row',
    maxWidth: 800,
    left: '50%',
    '-ms-overflow-style': 'none',
    scrollbarWidth: 'none'
  }
}))

function ReferMarkerFab(props) {
  const classes = useStyles()
  const locationName = props
  const [fabStates, setFabStates] = useState(new Array(8).fill(false)) // 8 is max length of categories
  const [checkedCategoryNames, setCheckedCategoryNames] = useState([])
  const [categories, setCategories] = useState([])

  const toggleFabState = (index) => {
    const newFabStates = [...fabStates]
    newFabStates[index] = !newFabStates[index]
    setFabStates(newFabStates)
  }

  useEffect(() => {
    const selectedCategories = []

    fabStates.map((checked, index) => {
      if (checked && categories) {
        selectedCategories.push(categories[index])
      }
      return null
    })
    setCheckedCategoryNames(selectedCategories)
  }, [fabStates, categories])

  useEffect(() => {
    setCategories(findCategories(locationName?.locationName))
  }, [locationName])

  return (
    <>
      <div className={classes.grid}>
        {categories?.map((item, index) => (
          <CustomButton
            key={item}
            buttonType={
              fabStates[index] ? 'boxButton_activated' : 'boxButton_inactivated'
            }
            variant='contained'
            size='small'
            onClick={() => toggleFabState(index)}
            style={{
              flexShrink: '0',
              boxSizing: 'border-box',
              // width: '20vw',
              height: '30px',
              marginRight: '7px'
            }}
          >
            {item}
          </CustomButton>
        ))}
      </div>
      <AllReferMarkers
        checkedItems={checkedCategoryNames}
        locationName={locationName}
      />
    </>
  )
}

export default ReferMarkerFab
